-- Deploy this SQL before enabling SERNEM_PREMIUM_TRIAL_ENABLED.
-- Keep restricted to service-role: ordinary users cannot create/alter reservations.
create table if not exists public.premium_trial_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  locale text not null check (locale in ('tr','en')),
  consent_version text not null,
  consent_at timestamptz not null,
  status text not null default 'reserved' check (status in ('reserved','checkout_created','checkout_failed','on_trial','active','cancelled','expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.premium_trial_reservations enable row level security;
revoke all on public.premium_trial_reservations from anon, authenticated;
create index if not exists premium_trial_reservations_status_idx on public.premium_trial_reservations (status);
-- Trial is considered consumed when Lemon validates on_trial/active;
-- customer support must verify provider checkout abandonment before resetting a failed reservation.
