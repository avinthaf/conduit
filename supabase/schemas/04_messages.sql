create table public.messages (
  id                uuid primary key default gen_random_uuid(),
  session_id        uuid not null references public.sessions(id) on delete cascade,
  role              text not null check (role in ('customer', 'agent', 'tool')),
  content           text not null,
  timestamp_seconds int,
  flagged           boolean default false,
  flag_note         text,
  created_at        timestamptz default now()
);

alter table public.messages enable row level security;

create policy "owner access" on public.messages
  for all to authenticated using (
    exists (
      select 1 from public.sessions
      where sessions.id = messages.session_id
        and sessions.user_id = auth.uid()
    )
  );

create index messages_session_id_idx on public.messages(session_id);
