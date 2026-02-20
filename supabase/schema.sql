create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now(),
  source text,
  metadata jsonb
);

alter table public.waitlist_signups enable row level security;

-- Security model:
-- - The browser never writes directly to this table.
-- - Inserts happen only through /api/waitlist using SUPABASE_SERVICE_ROLE_KEY on the server.
-- - service_role bypasses RLS, so we intentionally do not add public insert policies.
revoke all on table public.waitlist_signups from anon, authenticated;

do $$
declare existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'waitlist_signups'
  loop
    execute format('drop policy if exists %I on public.waitlist_signups', existing_policy.policyname);
  end loop;
end $$;
