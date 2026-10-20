begin;
-- Additive SIM5 storage. No changes to other Labs attempts, policies or triggers.
create table public.sim5_runs (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 schema_version text not null default 'sim5-mission/1' check(schema_version='sim5-mission/1'),
 locale text not null check(locale in ('tr','en')),
 status text not null default 'in_progress' check(status in ('in_progress','partial','completed','cancelled')),
 revision integer not null default 0 check(revision>=0),
 events jsonb not null default '[]' check(jsonb_typeof(events)='array'),
 report jsonb not null default '{}',
 score integer not null default 0 check(score between 0 and 100),
 xp_awarded integer not null default 0 check(xp_awarded between 0 and 200),
 started_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 ended_at timestamptz
);
create index sim5_runs_owner_history on public.sim5_runs(user_id,started_at desc);
alter table public.sim5_runs enable row level security;
create policy "Read own SIM5 runs" on public.sim5_runs for select to authenticated using(auth.uid()=user_id);
revoke all on public.sim5_runs from anon,authenticated;
grant select on public.sim5_runs to authenticated;
grant all on public.sim5_runs to service_role;

-- One lifetime best award for this static mission, even if display/schema evolves.
create table public.sim5_xp_best (
 user_id uuid primary key references auth.users(id) on delete cascade,
 best_xp integer not null default 0 check(best_xp between 0 and 200)
);
alter table public.sim5_xp_best enable row level security;
create policy "Read own SIM5 XP" on public.sim5_xp_best for select to authenticated using(auth.uid()=user_id);
revoke all on public.sim5_xp_best from anon,authenticated;
grant select on public.sim5_xp_best to authenticated;
grant all on public.sim5_xp_best to service_role;

-- Callable ONLY by trusted server after entitlement and full event-log replay.
-- Run lock/CAS makes retries idempotent. User lock serializes awards across runs.
create function public.save_sim5_run(p_user_id uuid,p_run_id uuid,p_revision integer,p_events jsonb,p_report jsonb,p_status text,p_score integer)
returns jsonb language plpgsql security definer set search_path=pg_catalog,public as $$
declare
 r public.sim5_runs%rowtype;
 previous_best integer;
 target_xp integer:=0;
 delta integer:=0;
 first_award boolean:=false;
 xp_total integer;
 lvl integer:=1;
 remaining integer;
begin
 if p_status not in ('in_progress','partial','completed','cancelled') or p_score not between 0 and 100
   or jsonb_typeof(p_events)<>'array' or jsonb_array_length(p_events)>4096
   or p_report->>'schema'<>'sim5-mission/1' or (p_report->>'score')::integer<>p_score then
  raise exception 'INVALID_RESULT';
 end if;
 select * into r from public.sim5_runs where id=p_run_id and user_id=p_user_id for update;
 if not found then raise exception 'RUN_NOT_FOUND'; end if;
 if r.events=p_events and r.revision>0 then
  return jsonb_build_object('revision',r.revision,'xpAwarded',r.xp_awarded,'status',r.status);
 end if;
 if r.status<>'in_progress' or r.revision<>p_revision then raise exception 'RUN_CONFLICT'; end if;
 -- Prevent stale or divergent histories even if a server caller forgets its prefix check.
 if jsonb_array_length(p_events)<jsonb_array_length(r.events) then raise exception 'LOG_CONFLICT'; end if;
 if exists(select 1 from jsonb_array_elements(r.events) with ordinality e(value,n)
           where e.value is distinct from p_events->((e.n-1)::integer)) then raise exception 'LOG_CONFLICT'; end if;
 if p_status='completed' then
  if jsonb_array_length(p_report->'completed')<>6 or p_report->>'phase'<>'finished' then raise exception 'INCOMPLETE_RESULT'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text||':sim5-static-six',0));
  insert into public.sim5_xp_best(user_id) values(p_user_id) on conflict do nothing;
  select best_xp into previous_best from public.sim5_xp_best where user_id=p_user_id for update;
  target_xp:=p_score*2;
  delta:=greatest(0,target_xp-previous_best);
  first_award:=previous_best=0 and delta>0;
  update public.sim5_xp_best set best_xp=greatest(previous_best,target_xp) where user_id=p_user_id;
  if delta>0 then
   insert into public.lab_user_progress(user_id) values(p_user_id) on conflict do nothing;
   update public.lab_user_progress set
    total_xp=total_xp+delta,
    scenario_count=scenario_count+case when first_award then 1 else 0 end,
    correct_count=correct_count+case when first_award then 6 else 0 end,
    current_streak=case when last_activity_date=current_date then current_streak when last_activity_date=current_date-1 then current_streak+1 else 1 end,
    longest_streak=greatest(longest_streak,case when last_activity_date=current_date then current_streak when last_activity_date=current_date-1 then current_streak+1 else 1 end),
    last_activity_date=current_date,updated_at=now()
   where user_id=p_user_id returning total_xp into xp_total;
   -- Match app/lib/labs/progression.ts (250 + level*250 per level).
   remaining:=xp_total;
   while remaining>=250+lvl*250 and lvl<100 loop remaining:=remaining-(250+lvl*250);lvl:=lvl+1;end loop;
   update public.lab_user_progress set level=lvl where user_id=p_user_id;
  end if;
 end if;
 update public.sim5_runs set events=p_events,report=p_report,status=p_status,score=p_score,
  xp_awarded=delta,revision=revision+1,updated_at=now(),
  ended_at=case when p_status='in_progress' then null else now() end
 where id=p_run_id returning * into r;
 return jsonb_build_object('revision',r.revision,'xpAwarded',r.xp_awarded,'status',r.status);
end;
$$;
revoke all on function public.save_sim5_run(uuid,uuid,integer,jsonb,jsonb,text,integer) from public,anon,authenticated;
grant execute on function public.save_sim5_run(uuid,uuid,integer,jsonb,jsonb,text,integer) to service_role;
commit;
