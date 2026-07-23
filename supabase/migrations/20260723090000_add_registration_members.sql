alter table public.registrations
add column if not exists members jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_members_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
    add constraint registrations_members_check
    check (
      members is null
      or case
        when jsonb_typeof(members) = 'array' then jsonb_array_length(members) = 3
        else false
      end
    );
  end if;
end
$$;

drop policy if exists "Public registrations can be submitted" on public.registrations;
create policy "Public registrations can be submitted"
on public.registrations
for insert
to anon, authenticated
with check (
  team_size = 3
  and consent = true
  and members is not null
  and case
    when jsonb_typeof(members) = 'array' then jsonb_array_length(members) = 3
    else false
  end
);

comment on column public.registrations.members is 'Exactly three DCC team member records';

notify pgrst, 'reload schema';
