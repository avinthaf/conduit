create table public.articles (
  id         text primary key,  -- e.g. 'KB-2041', 'SOP-0118'
  title      text not null,
  body       text not null,
  type       text not null check (type in ('kb', 'sop')),
  category   text,
  created_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "authenticated read" on public.articles
  for select to authenticated using (true);
