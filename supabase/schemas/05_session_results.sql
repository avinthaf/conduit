create table public.session_results (
  id                  uuid primary key default gen_random_uuid(),
  session_id          uuid not null unique references public.sessions(id) on delete cascade,
  strengths           text[] default '{}',
  score_empathy       int check (score_empathy between 0 and 100),
  score_policy        int check (score_policy between 0 and 100),
  score_communication int check (score_communication between 0 and 100),
  score_escalation    int check (score_escalation between 0 and 100),
  created_at          timestamptz default now()
);

alter table public.session_results enable row level security;

create policy "owner access" on public.session_results
  for all to authenticated using (
    exists (
      select 1 from public.sessions
      where sessions.id = session_results.session_id
        and sessions.user_id = auth.uid()
    )
  );

create index session_results_session_id_idx on public.session_results(session_id);
