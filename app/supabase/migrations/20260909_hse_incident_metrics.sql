create table if not exists public.hse_incident_metrics (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  period_month date not null,
  project_name text not null default 'All Projects',

  worked_hours numeric not null default 0,

  near_miss integer not null default 0,
  first_aid integer not null default 0,
  medical_treatment integer not null default 0,
  recordable_cases integer not null default 0,
  lti integer not null default 0,
  lost_days integer not null default 0,
  dart_cases integer not null default 0,

  inspection_count integer not null default 0,
  toolbox_talk_count integer not null default 0,
  training_hours numeric not null default 0,
  management_walkdown_count integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint hse_incident_metrics_user_month_project_key
    unique (user_id, period_month, project_name),

  constraint hse_incident_metrics_non_negative
    check (
      worked_hours >= 0 and
      near_miss >= 0 and
      first_aid >= 0 and
      medical_treatment >= 0 and
      recordable_cases >= 0 and
      lti >= 0 and
      lost_days >= 0 and
      dart_cases >= 0 and
      inspection_count >= 0 and
      toolbox_talk_count >= 0 and
      training_hours >= 0 and
      management_walkdown_count >= 0
    )
);

alter table public.hse_incident_metrics
enable row level security;

drop policy if exists
  "Users can view own HSE incident metrics"
on public.hse_incident_metrics;

create policy
  "Users can view own HSE incident metrics"
on public.hse_incident_metrics
for select
using (auth.uid() = user_id);

drop policy if exists
  "Users can insert own HSE incident metrics"
on public.hse_incident_metrics;

create policy
  "Users can insert own HSE incident metrics"
on public.hse_incident_metrics
for insert
with check (auth.uid() = user_id);

drop policy if exists
  "Users can update own HSE incident metrics"
on public.hse_incident_metrics;

create policy
  "Users can update own HSE incident metrics"
on public.hse_incident_metrics
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists
  "Users can delete own HSE incident metrics"
on public.hse_incident_metrics;

create policy
  "Users can delete own HSE incident metrics"
on public.hse_incident_metrics
for delete
using (auth.uid() = user_id);
