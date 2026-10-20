-- Additive SIM5 daily replay rewards, Europe/Budapest calendar days.
-- Does NOT retroactively add XP or change any existing XP/history records.
-- Calendar day is computed inside the trusted database; the client cannot
-- choose or spoof its reward day.
begin;
create table public.sim5_daily_rewards (
 user_id uuid not null references auth.users(id) on delete cascade,
 reward_date date not null,
 run_id uuid not null unique references public.sim5_runs(id) on delete cascade,
 xp_awarded integer not null default 0 check (xp_awarded in (0,50)),
 created_at timestamptz not null default now(),
 primary key(user_id,reward_date)
);
create index sim5_daily_rewards_user_latest on public.sim5_daily_rewards(user_id,reward_date desc);
alter table public.sim5_daily_rewards enable row level security;
create policy "Read own SIM5 daily rewards" on public.sim5_daily_rewards
 for select to authenticated using(auth.uid()=user_id);
revoke all on public.sim5_daily_rewards from public,anon,authenticated;
grant select on public.sim5_daily_rewards to authenticated;
grant all on public.sim5_daily_rewards to service_role;

-- Prior successful completions (including today's 200-XP first award) reserve
-- that historical day's slot for 0 new daily XP. No retroactive double reward.
insert into public.sim5_daily_rewards(user_id,reward_date,run_id,xp_awarded,created_at)
select distinct on (user_id,(ended_at at time zone 'Europe/Budapest')::date)
 user_id,(ended_at at time zone 'Europe/Budapest')::date,id,0,ended_at
from public.sim5_runs
where status='completed' and ended_at is not null
order by user_id,(ended_at at time zone 'Europe/Budapest')::date,ended_at,id;

comment on table public.sim5_daily_rewards is
 'SIM5 daily max one reward per user per Budapest day across future missions. Zero rows reserve a day already rewarded by lifetime best.';

-- Preserve the previous server-only RPC signature so the deployed API remains
-- compatible. Preserve its replay guards, serial locks and best-score awards.
create or replace function public.save_sim5_run(p_user_id uuid,p_run_id uuid,p_revision integer,p_events jsonb,p_report jsonb,p_status text,p_score integer)
returns jsonb language plpgsql security definer set search_path=pg_catalog,public as $$
declare
 r public.sim5_runs%rowtype;
 previous_best integer;
 target_xp integer:=0;
 delta integer:=0;
 best_delta integer:=0;
 daily_delta integer:=0;
 today_budapest date;
 first_award boolean:=false;
 xp_total integer;
 lvl integer:=1;
 remaining integer;
begin
 if p_status is null or p_score is null or p_revision is null or p_revision<0
   or p_events is null or p_report is null or jsonb_typeof(p_report)<>'object'
   or p_status not in ('in_progress','partial','completed','cancelled') or p_score not between 0 and 100
   or jsonb_typeof(p_events)<>'array' or jsonb_array_length(p_events)>4096
   or p_report->>'schema' is distinct from 'sim5-mission/1' or (p_report->>'score')::integer is distinct from p_score then
  raise exception 'INVALID_RESULT';
 end if;
 select * into r from public.sim5_runs where id=p_run_id and user_id=p_user_id for update;
 if not found then raise exception 'RUN_NOT_FOUND'; end if;
 if r.events=p_events and r.revision>0 then
  return jsonb_build_object(
   'revision',r.revision,'xpAwarded',r.xp_awarded,'status',r.status,
   'bestXpAwarded',r.xp_awarded-coalesce((select xp_awarded from public.sim5_daily_rewards where run_id=r.id),0),
   'dailyXpAwarded',coalesce((select xp_awarded from public.sim5_daily_rewards where run_id=r.id),0)
  );
 end if;
 if r.status<>'in_progress' or r.revision<>p_revision then raise exception 'RUN_CONFLICT'; end if;
 -- Prevent stale or divergent histories even if a server caller forgets its prefix check.
 if jsonb_array_length(p_events)<jsonb_array_length(r.events) then raise exception 'LOG_CONFLICT'; end if;
 if exists(select 1 from jsonb_array_elements(r.events) with ordinality e(value,n)
           where e.value is distinct from p_events->((e.n-1)::integer)) then raise exception 'LOG_CONFLICT'; end if;
 if p_status='completed' then
  if jsonb_typeof(p_report->'completed') is distinct from 'array'
     or p_report->>'phase' is distinct from 'finished' then raise exception 'INCOMPLETE_RESULT'; end if;
  if jsonb_array_length(p_report->'completed')<>6
     or not (p_report->'completed' @> '["hotwork","lifting","leak","access","droppedTool","materials"]'::jsonb)
     then raise exception 'INCOMPLETE_RESULT'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text||':sim5-static-six',0));
  insert into public.sim5_xp_best(user_id) values(p_user_id) on conflict do nothing;
  select best_xp into previous_best from public.sim5_xp_best where user_id=p_user_id for update;
  target_xp:=p_score*2;
  best_delta:=greatest(0,target_xp-previous_best);
  delta:=best_delta;
  today_budapest:=(now() at time zone 'Europe/Budapest')::date;
  first_award:=previous_best=0 and delta>0;
  update public.sim5_xp_best set best_xp=greatest(previous_best,target_xp) where user_id=p_user_id;
  -- First lifetime success occupies today's daily slot without a second bonus.
  -- Only a perfect six-finding replay after the first lifetime award may
  -- claim the daily reward. The owner advisory lock + (user,date) PK mean
  -- simultaneous finishing runs can never claim 50 XP twice.
  if first_award then
   insert into public.sim5_daily_rewards(user_id,reward_date,run_id,xp_awarded)
    values(p_user_id,today_budapest,p_run_id,0) on conflict (user_id,reward_date) do nothing;
  elsif p_score=100 then
   insert into public.sim5_daily_rewards(user_id,reward_date,run_id,xp_awarded)
    values(p_user_id,today_budapest,p_run_id,50)
    on conflict (user_id,reward_date) do nothing
    returning xp_awarded into daily_delta;
  end if;
  delta:=best_delta+coalesce(daily_delta,0);
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
 return jsonb_build_object('revision',r.revision,'xpAwarded',r.xp_awarded,'status',r.status,'bestXpAwarded',best_delta,'dailyXpAwarded',coalesce(daily_delta,0));
end;
$$;
-- Same service-only execution rights as the original function.
revoke all on function public.save_sim5_run(uuid,uuid,integer,jsonb,jsonb,text,integer) from public,anon,authenticated;
grant execute on function public.save_sim5_run(uuid,uuid,integer,jsonb,jsonb,text,integer) to service_role;
commit;
