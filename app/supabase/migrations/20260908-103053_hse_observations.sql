create extension if not exists pgcrypto;

create table if not exists public.hse_observations (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  observation_date date not null default current_date,

  project_name text,
  location text,
  company_name text,

  observation_type text not null
    check (
      observation_type in (
        'positive',
        'unsafe_act',
        'unsafe_condition'
      )
    ),

  category text not null,

  risk_level text not null default 'medium'
    check (
      risk_level in (
        'low',
        'medium',
        'high',
        'critical'
      )
    ),

  title text not null,
  description text not null,

  corrective_action text,
  responsible_person text,
  target_date date,

  status text not null default 'open'
    check (
      status in (
        'open',
        'in_progress',
        'closed'
      )
    ),

  photo_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists
  hse_observations_user_id_idx
on public.hse_observations(user_id);

create index if not exists
  hse_observations_date_idx
on public.hse_observations(observation_date desc);

create index if not exists
  hse_observations_status_idx
on public.hse_observations(status);

alter table public.hse_observations
enable row level security;

drop policy if exists
  "Users can read own observations"
on public.hse_observations;

create policy
  "Users can read own observations"
on public.hse_observations
for select
using (auth.uid() = user_id);

drop policy if exists
  "Users can insert own observations"
on public.hse_observations;

create policy
  "Users can insert own observations"
on public.hse_observations
for insert
with check (auth.uid() = user_id);

drop policy if exists
  "Users can update own observations"
on public.hse_observations;

create policy
  "Users can update own observations"
on public.hse_observations
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists
  "Users can delete own observations"
on public.hse_observations;

create policy
  "Users can delete own observations"
on public.hse_observations
for delete
using (auth.uid() = user_id);
