alter table public.profiles
  add column if not exists lemon_subscription_id text,
  add column if not exists lemon_customer_id text,
  add column if not exists subscription_status text,
  add column if not exists subscription_cancelled boolean not null default false,
  add column if not exists subscription_renews_at timestamptz,
  add column if not exists subscription_ends_at timestamptz,
  add column if not exists subscription_synced_at timestamptz;

alter table public.pending_premium_entitlements
  add column if not exists lemon_customer_id text,
  add column if not exists subscription_status text,
  add column if not exists subscription_cancelled boolean not null default false,
  add column if not exists subscription_renews_at timestamptz,
  add column if not exists subscription_ends_at timestamptz;

create unique index if not exists profiles_lemon_subscription_id_uidx
  on public.profiles (lemon_subscription_id)
  where lemon_subscription_id is not null;

create or replace function public.apply_pending_premium_on_profile()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'auth'
as $function$
declare
  user_email text;
  entitlement public.pending_premium_entitlements%rowtype;
begin
  select lower(email)
  into user_email
  from auth.users
  where id = new.id;

  if user_email is not null then
    select *
    into entitlement
    from public.pending_premium_entitlements
    where lower(email) = user_email
      and status = 'active'
    order by updated_at desc
    limit 1;

    if found then
      new.plan := 'premium';
      new.lemon_subscription_id := entitlement.lemon_subscription_id;
      new.lemon_customer_id := entitlement.lemon_customer_id;
      new.subscription_status := coalesce(entitlement.subscription_status, 'active');
      new.subscription_cancelled := coalesce(entitlement.subscription_cancelled, false);
      new.subscription_renews_at := entitlement.subscription_renews_at;
      new.subscription_ends_at := entitlement.subscription_ends_at;
      new.subscription_synced_at := now();

      update public.pending_premium_entitlements
      set status = 'claimed',
          updated_at = now()
      where id = entitlement.id;
    end if;
  end if;

  return new;
end;
$function$;
