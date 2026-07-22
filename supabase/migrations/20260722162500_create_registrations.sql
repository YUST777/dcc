create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  team_name text not null check (char_length(trim(team_name)) between 2 and 100),
  university text not null check (char_length(trim(university)) between 2 and 160),
  faculty text not null check (char_length(trim(faculty)) between 2 and 160),
  team_size smallint not null default 3 check (team_size = 3),
  leader_full_name text not null check (char_length(trim(leader_full_name)) between 2 and 120),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  phone text not null check (char_length(trim(phone)) between 8 and 30),
  university_id text not null check (char_length(trim(university_id)) between 2 and 80),
  consent boolean not null check (consent),
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

revoke all on table public.registrations from anon, authenticated;
grant insert on table public.registrations to anon, authenticated;

drop policy if exists "Public registrations can be submitted" on public.registrations;
create policy "Public registrations can be submitted"
on public.registrations
for insert
to anon, authenticated
with check (team_size = 3 and consent = true);

comment on table public.registrations is 'DCC 2026 team registration submissions';

notify pgrst, 'reload schema';
