create table public.sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  scenario_id uuid not null references public.scenarios(id),
  status      text not null default 'active' check (status in ('active', 'completed')),
  score       int check (score between 0 and 100),
  grade       text,
  started_at  timestamptz default now(),
  ended_at    timestamptz
);

alter table public.sessions enable row level security;

create policy "owner access" on public.sessions
  for all to authenticated using (user_id = auth.uid());

create index sessions_user_id_idx on public.sessions(user_id);
create index sessions_scenario_id_idx on public.sessions(scenario_id);
