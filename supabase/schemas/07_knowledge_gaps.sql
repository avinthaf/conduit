create table public.knowledge_gaps (
  id                uuid primary key default gen_random_uuid(),
  session_result_id uuid not null references public.session_results(id) on delete cascade,
  article_id        text not null references public.articles(id),
  sort_order        int default 0
);

alter table public.knowledge_gaps enable row level security;

create policy "owner access" on public.knowledge_gaps
  for all to authenticated using (
    exists (
      select 1 from public.session_results sr
      join public.sessions s on s.id = sr.session_id
      where sr.id = knowledge_gaps.session_result_id
        and s.user_id = auth.uid()
    )
  );

create index knowledge_gaps_result_id_idx on public.knowledge_gaps(session_result_id);
