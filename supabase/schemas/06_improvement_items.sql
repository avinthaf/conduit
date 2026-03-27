create table public.improvement_items (
  id                uuid primary key default gen_random_uuid(),
  session_result_id uuid not null references public.session_results(id) on delete cascade,
  label             text not null,
  message_timestamp int,  -- seconds into the session
  detail            text,
  sort_order        int default 0
);

alter table public.improvement_items enable row level security;

create policy "owner access" on public.improvement_items
  for all to authenticated using (
    exists (
      select 1 from public.session_results sr
      join public.sessions s on s.id = sr.session_id
      where sr.id = improvement_items.session_result_id
        and s.user_id = auth.uid()
    )
  );

create index improvement_items_result_id_idx on public.improvement_items(session_result_id);
