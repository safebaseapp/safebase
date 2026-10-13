alter table public.premium_trial_reservations
  add column if not exists lemon_subscription_id text,
  add column if not exists trial_ends_at timestamptz,
  add column if not exists access_ends_at timestamptz;
create index if not exists premium_trial_reservations_subscription_idx
  on public.premium_trial_reservations (lemon_subscription_id);
