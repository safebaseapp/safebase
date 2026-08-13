create table if not exists public.simops_assessments (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  project_name text,
  area_unit text,
  work_date date,

  interaction_level text not null default 'low',
  initial_risk integer not null default 0,
  residual_risk integer not null default 0,

  decision text,
  action_status text,

  payload jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists simops_assessments_user_id_idx
  on public.simops_assessments(user_id);

create index if not exists simops_assessments_created_at_idx
  on public.simops_assessments(created_at desc);

alter table public.simops_assessments enable row level security;

drop policy if exists "Users can view own SIMOPS assessments"
  on public.simops_assessments;

create policy "Users can view own SIMOPS assessments"
on public.simops_assessments
for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own SIMOPS assessments"
  on public.simops_assessments;

create policy "Users can create own SIMOPS assessments"
on public.simops_assessments
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own SIMOPS assessments"
  on public.simops_assessments;

create policy "Users can update own SIMOPS assessments"
on public.simops_assessments
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own SIMOPS assessments"
  on public.simops_assessments;

create policy "Users can delete own SIMOPS assessments"
on public.simops_assessments
for delete
using (auth.uid() = user_id);
