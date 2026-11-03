-- SERNEM account billing lifecycle and explicit marketing email preference.
-- Additive only; no existing member, subscription or entitlement data is changed.
alter table public.profiles
  add column if not exists subscription_paid_through_at timestamptz,
  add column if not exists subscription_paid_verified_at timestamptz;

create table if not exists public.user_communication_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  marketing_email_opt_in boolean not null default false,
  marketing_email_changed_at timestamptz not null default now()
);

-- Prevent direct API callers from forging marketing-consent timestamps.
create or replace function public.stamp_marketing_preference_time()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog
as $
begin
  new.marketing_email_changed_at := now();
  return new;
end;
$;

drop trigger if exists stamp_marketing_preference_time on public.user_communication_preferences;
create trigger stamp_marketing_preference_time
before insert or update on public.user_communication_preferences
for each row execute function public.stamp_marketing_preference_time();

alter table public.user_communication_preferences enable row level security;

-- The authenticated user can read and update only their own voluntary preference.
revoke all on table public.user_communication_preferences from public, anon, authenticated;
grant select, insert, update on table public.user_communication_preferences to authenticated;
grant select, insert, update, delete on table public.user_communication_preferences to service_role;

drop policy if exists "User reads own marketing preference" on public.user_communication_preferences;
create policy "User reads own marketing preference"
  on public.user_communication_preferences for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "User creates own marketing preference" on public.user_communication_preferences;
create policy "User creates own marketing preference"
  on public.user_communication_preferences for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "User updates own marketing preference" on public.user_communication_preferences;
create policy "User updates own marketing preference"
  on public.user_communication_preferences for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

comment on table public.user_communication_preferences is
  'Explicit marketing email preference. No row means no marketing consent; transactional account emails are separate.';
comment on column public.user_communication_preferences.marketing_email_opt_in is
  'True ONLY after explicit user opt-in; false or missing row means no product or promotional email consent.';
