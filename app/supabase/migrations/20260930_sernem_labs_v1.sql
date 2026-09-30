create extension if not exists pgcrypto;

create table if not exists public.lab_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario_id text not null,
  scenario_type text not null,
  category text not null,
  difficulty text not null,
  locale text not null check (locale in ('tr', 'en')),
  selected_answers jsonb not null default '[]'::jsonb,
  correct_count integer not null default 0,
  missed_count integer not null default 0,
  incorrect_count integer not null default 0,
  score integer not null check (score between 0 and 100),
  xp_earned integer not null default 0 check (xp_earned >= 0),
  completed boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists lab_attempts_user_id_idx on public.lab_attempts(user_id);
create index if not exists lab_attempts_user_category_idx on public.lab_attempts(user_id, category);
create index if not exists lab_attempts_scenario_id_idx on public.lab_attempts(scenario_id);
create index if not exists lab_attempts_created_at_idx on public.lab_attempts(created_at desc);

alter table public.lab_attempts enable row level security;

drop policy if exists "Users can read own lab attempts" on public.lab_attempts;
create policy "Users can read own lab attempts"
on public.lab_attempts for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own lab attempts" on public.lab_attempts;
create policy "Users can insert own lab attempts"
on public.lab_attempts for insert
with check (auth.uid() = user_id);

create table if not exists public.lab_user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp integer not null default 0 check (total_xp >= 0),
  level integer not null default 1 check (level >= 1),
  current_streak integer not null default 0 check (current_streak >= 0),
  longest_streak integer not null default 0 check (longest_streak >= 0),
  scenario_count integer not null default 0 check (scenario_count >= 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  last_activity_date date,
  updated_at timestamptz not null default now()
);

alter table public.lab_user_progress enable row level security;

drop policy if exists "Users can read own lab progress" on public.lab_user_progress;
create policy "Users can read own lab progress"
on public.lab_user_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own lab progress" on public.lab_user_progress;
create policy "Users can insert own lab progress"
on public.lab_user_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own lab progress" on public.lab_user_progress;
create policy "Users can update own lab progress"
on public.lab_user_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
