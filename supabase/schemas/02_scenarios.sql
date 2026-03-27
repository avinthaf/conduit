create table public.scenarios (
  id                      uuid primary key default gen_random_uuid(),
  name                    text not null,
  type                    text not null check (type in ('Billing Issues', 'Product Returns', 'Technical Support', 'Escalations')),
  difficulty              text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  estimated_minutes       int not null,
  objectives              text[] not null default '{}',
  customer_name           text,
  customer_tier           text,
  customer_sentiment      text,
  customer_prior_contacts int default 0,
  created_at              timestamptz default now()
);

alter table public.scenarios enable row level security;

create policy "authenticated read" on public.scenarios
  for select to authenticated using (true);
