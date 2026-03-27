
  create table "public"."articles" (
    "id" text not null,
    "title" text not null,
    "body" text not null,
    "type" text not null,
    "category" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."articles" enable row level security;


  create table "public"."improvement_items" (
    "id" uuid not null default gen_random_uuid(),
    "session_result_id" uuid not null,
    "label" text not null,
    "message_timestamp" integer,
    "detail" text,
    "sort_order" integer default 0
      );


alter table "public"."improvement_items" enable row level security;


  create table "public"."knowledge_gaps" (
    "id" uuid not null default gen_random_uuid(),
    "session_result_id" uuid not null,
    "article_id" text not null,
    "sort_order" integer default 0
      );


alter table "public"."knowledge_gaps" enable row level security;


  create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "role" text not null,
    "content" text not null,
    "timestamp_seconds" integer,
    "flagged" boolean default false,
    "flag_note" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."messages" enable row level security;


  create table "public"."scenarios" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "type" text not null,
    "difficulty" text not null,
    "estimated_minutes" integer not null,
    "objectives" text[] not null default '{}'::text[],
    "customer_name" text,
    "customer_tier" text,
    "customer_sentiment" text,
    "customer_prior_contacts" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."scenarios" enable row level security;


  create table "public"."session_results" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "strengths" text[] default '{}'::text[],
    "score_empathy" integer,
    "score_policy" integer,
    "score_communication" integer,
    "score_escalation" integer,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."session_results" enable row level security;


  create table "public"."sessions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "scenario_id" uuid not null,
    "status" text not null default 'active'::text,
    "score" integer,
    "grade" text,
    "started_at" timestamp with time zone default now(),
    "ended_at" timestamp with time zone
      );


alter table "public"."sessions" enable row level security;

CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id);

CREATE UNIQUE INDEX improvement_items_pkey ON public.improvement_items USING btree (id);

CREATE INDEX improvement_items_result_id_idx ON public.improvement_items USING btree (session_result_id);

CREATE UNIQUE INDEX knowledge_gaps_pkey ON public.knowledge_gaps USING btree (id);

CREATE INDEX knowledge_gaps_result_id_idx ON public.knowledge_gaps USING btree (session_result_id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE INDEX messages_session_id_idx ON public.messages USING btree (session_id);

CREATE UNIQUE INDEX scenarios_pkey ON public.scenarios USING btree (id);

CREATE UNIQUE INDEX session_results_pkey ON public.session_results USING btree (id);

CREATE INDEX session_results_session_id_idx ON public.session_results USING btree (session_id);

CREATE UNIQUE INDEX session_results_session_id_key ON public.session_results USING btree (session_id);

CREATE UNIQUE INDEX sessions_pkey ON public.sessions USING btree (id);

CREATE INDEX sessions_scenario_id_idx ON public.sessions USING btree (scenario_id);

CREATE INDEX sessions_user_id_idx ON public.sessions USING btree (user_id);

alter table "public"."articles" add constraint "articles_pkey" PRIMARY KEY using index "articles_pkey";

alter table "public"."improvement_items" add constraint "improvement_items_pkey" PRIMARY KEY using index "improvement_items_pkey";

alter table "public"."knowledge_gaps" add constraint "knowledge_gaps_pkey" PRIMARY KEY using index "knowledge_gaps_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."scenarios" add constraint "scenarios_pkey" PRIMARY KEY using index "scenarios_pkey";

alter table "public"."session_results" add constraint "session_results_pkey" PRIMARY KEY using index "session_results_pkey";

alter table "public"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "public"."articles" add constraint "articles_type_check" CHECK ((type = ANY (ARRAY['kb'::text, 'sop'::text]))) not valid;

alter table "public"."articles" validate constraint "articles_type_check";

alter table "public"."improvement_items" add constraint "improvement_items_session_result_id_fkey" FOREIGN KEY (session_result_id) REFERENCES public.session_results(id) ON DELETE CASCADE not valid;

alter table "public"."improvement_items" validate constraint "improvement_items_session_result_id_fkey";

alter table "public"."knowledge_gaps" add constraint "knowledge_gaps_article_id_fkey" FOREIGN KEY (article_id) REFERENCES public.articles(id) not valid;

alter table "public"."knowledge_gaps" validate constraint "knowledge_gaps_article_id_fkey";

alter table "public"."knowledge_gaps" add constraint "knowledge_gaps_session_result_id_fkey" FOREIGN KEY (session_result_id) REFERENCES public.session_results(id) ON DELETE CASCADE not valid;

alter table "public"."knowledge_gaps" validate constraint "knowledge_gaps_session_result_id_fkey";

alter table "public"."messages" add constraint "messages_role_check" CHECK ((role = ANY (ARRAY['customer'::text, 'agent'::text, 'tool'::text]))) not valid;

alter table "public"."messages" validate constraint "messages_role_check";

alter table "public"."messages" add constraint "messages_session_id_fkey" FOREIGN KEY (session_id) REFERENCES public.sessions(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_session_id_fkey";

alter table "public"."scenarios" add constraint "scenarios_difficulty_check" CHECK ((difficulty = ANY (ARRAY['Beginner'::text, 'Intermediate'::text, 'Advanced'::text]))) not valid;

alter table "public"."scenarios" validate constraint "scenarios_difficulty_check";

alter table "public"."scenarios" add constraint "scenarios_type_check" CHECK ((type = ANY (ARRAY['Billing Issues'::text, 'Product Returns'::text, 'Technical Support'::text, 'Escalations'::text]))) not valid;

alter table "public"."scenarios" validate constraint "scenarios_type_check";

alter table "public"."session_results" add constraint "session_results_score_communication_check" CHECK (((score_communication >= 0) AND (score_communication <= 100))) not valid;

alter table "public"."session_results" validate constraint "session_results_score_communication_check";

alter table "public"."session_results" add constraint "session_results_score_empathy_check" CHECK (((score_empathy >= 0) AND (score_empathy <= 100))) not valid;

alter table "public"."session_results" validate constraint "session_results_score_empathy_check";

alter table "public"."session_results" add constraint "session_results_score_escalation_check" CHECK (((score_escalation >= 0) AND (score_escalation <= 100))) not valid;

alter table "public"."session_results" validate constraint "session_results_score_escalation_check";

alter table "public"."session_results" add constraint "session_results_score_policy_check" CHECK (((score_policy >= 0) AND (score_policy <= 100))) not valid;

alter table "public"."session_results" validate constraint "session_results_score_policy_check";

alter table "public"."session_results" add constraint "session_results_session_id_fkey" FOREIGN KEY (session_id) REFERENCES public.sessions(id) ON DELETE CASCADE not valid;

alter table "public"."session_results" validate constraint "session_results_session_id_fkey";

alter table "public"."session_results" add constraint "session_results_session_id_key" UNIQUE using index "session_results_session_id_key";

alter table "public"."sessions" add constraint "sessions_scenario_id_fkey" FOREIGN KEY (scenario_id) REFERENCES public.scenarios(id) not valid;

alter table "public"."sessions" validate constraint "sessions_scenario_id_fkey";

alter table "public"."sessions" add constraint "sessions_score_check" CHECK (((score >= 0) AND (score <= 100))) not valid;

alter table "public"."sessions" validate constraint "sessions_score_check";

alter table "public"."sessions" add constraint "sessions_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'completed'::text]))) not valid;

alter table "public"."sessions" validate constraint "sessions_status_check";

alter table "public"."sessions" add constraint "sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."sessions" validate constraint "sessions_user_id_fkey";

grant delete on table "public"."articles" to "anon";

grant insert on table "public"."articles" to "anon";

grant references on table "public"."articles" to "anon";

grant select on table "public"."articles" to "anon";

grant trigger on table "public"."articles" to "anon";

grant truncate on table "public"."articles" to "anon";

grant update on table "public"."articles" to "anon";

grant delete on table "public"."articles" to "authenticated";

grant insert on table "public"."articles" to "authenticated";

grant references on table "public"."articles" to "authenticated";

grant select on table "public"."articles" to "authenticated";

grant trigger on table "public"."articles" to "authenticated";

grant truncate on table "public"."articles" to "authenticated";

grant update on table "public"."articles" to "authenticated";

grant delete on table "public"."articles" to "service_role";

grant insert on table "public"."articles" to "service_role";

grant references on table "public"."articles" to "service_role";

grant select on table "public"."articles" to "service_role";

grant trigger on table "public"."articles" to "service_role";

grant truncate on table "public"."articles" to "service_role";

grant update on table "public"."articles" to "service_role";

grant delete on table "public"."improvement_items" to "anon";

grant insert on table "public"."improvement_items" to "anon";

grant references on table "public"."improvement_items" to "anon";

grant select on table "public"."improvement_items" to "anon";

grant trigger on table "public"."improvement_items" to "anon";

grant truncate on table "public"."improvement_items" to "anon";

grant update on table "public"."improvement_items" to "anon";

grant delete on table "public"."improvement_items" to "authenticated";

grant insert on table "public"."improvement_items" to "authenticated";

grant references on table "public"."improvement_items" to "authenticated";

grant select on table "public"."improvement_items" to "authenticated";

grant trigger on table "public"."improvement_items" to "authenticated";

grant truncate on table "public"."improvement_items" to "authenticated";

grant update on table "public"."improvement_items" to "authenticated";

grant delete on table "public"."improvement_items" to "service_role";

grant insert on table "public"."improvement_items" to "service_role";

grant references on table "public"."improvement_items" to "service_role";

grant select on table "public"."improvement_items" to "service_role";

grant trigger on table "public"."improvement_items" to "service_role";

grant truncate on table "public"."improvement_items" to "service_role";

grant update on table "public"."improvement_items" to "service_role";

grant delete on table "public"."knowledge_gaps" to "anon";

grant insert on table "public"."knowledge_gaps" to "anon";

grant references on table "public"."knowledge_gaps" to "anon";

grant select on table "public"."knowledge_gaps" to "anon";

grant trigger on table "public"."knowledge_gaps" to "anon";

grant truncate on table "public"."knowledge_gaps" to "anon";

grant update on table "public"."knowledge_gaps" to "anon";

grant delete on table "public"."knowledge_gaps" to "authenticated";

grant insert on table "public"."knowledge_gaps" to "authenticated";

grant references on table "public"."knowledge_gaps" to "authenticated";

grant select on table "public"."knowledge_gaps" to "authenticated";

grant trigger on table "public"."knowledge_gaps" to "authenticated";

grant truncate on table "public"."knowledge_gaps" to "authenticated";

grant update on table "public"."knowledge_gaps" to "authenticated";

grant delete on table "public"."knowledge_gaps" to "service_role";

grant insert on table "public"."knowledge_gaps" to "service_role";

grant references on table "public"."knowledge_gaps" to "service_role";

grant select on table "public"."knowledge_gaps" to "service_role";

grant trigger on table "public"."knowledge_gaps" to "service_role";

grant truncate on table "public"."knowledge_gaps" to "service_role";

grant update on table "public"."knowledge_gaps" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."scenarios" to "anon";

grant insert on table "public"."scenarios" to "anon";

grant references on table "public"."scenarios" to "anon";

grant select on table "public"."scenarios" to "anon";

grant trigger on table "public"."scenarios" to "anon";

grant truncate on table "public"."scenarios" to "anon";

grant update on table "public"."scenarios" to "anon";

grant delete on table "public"."scenarios" to "authenticated";

grant insert on table "public"."scenarios" to "authenticated";

grant references on table "public"."scenarios" to "authenticated";

grant select on table "public"."scenarios" to "authenticated";

grant trigger on table "public"."scenarios" to "authenticated";

grant truncate on table "public"."scenarios" to "authenticated";

grant update on table "public"."scenarios" to "authenticated";

grant delete on table "public"."scenarios" to "service_role";

grant insert on table "public"."scenarios" to "service_role";

grant references on table "public"."scenarios" to "service_role";

grant select on table "public"."scenarios" to "service_role";

grant trigger on table "public"."scenarios" to "service_role";

grant truncate on table "public"."scenarios" to "service_role";

grant update on table "public"."scenarios" to "service_role";

grant delete on table "public"."session_results" to "anon";

grant insert on table "public"."session_results" to "anon";

grant references on table "public"."session_results" to "anon";

grant select on table "public"."session_results" to "anon";

grant trigger on table "public"."session_results" to "anon";

grant truncate on table "public"."session_results" to "anon";

grant update on table "public"."session_results" to "anon";

grant delete on table "public"."session_results" to "authenticated";

grant insert on table "public"."session_results" to "authenticated";

grant references on table "public"."session_results" to "authenticated";

grant select on table "public"."session_results" to "authenticated";

grant trigger on table "public"."session_results" to "authenticated";

grant truncate on table "public"."session_results" to "authenticated";

grant update on table "public"."session_results" to "authenticated";

grant delete on table "public"."session_results" to "service_role";

grant insert on table "public"."session_results" to "service_role";

grant references on table "public"."session_results" to "service_role";

grant select on table "public"."session_results" to "service_role";

grant trigger on table "public"."session_results" to "service_role";

grant truncate on table "public"."session_results" to "service_role";

grant update on table "public"."session_results" to "service_role";

grant delete on table "public"."sessions" to "anon";

grant insert on table "public"."sessions" to "anon";

grant references on table "public"."sessions" to "anon";

grant select on table "public"."sessions" to "anon";

grant trigger on table "public"."sessions" to "anon";

grant truncate on table "public"."sessions" to "anon";

grant update on table "public"."sessions" to "anon";

grant delete on table "public"."sessions" to "authenticated";

grant insert on table "public"."sessions" to "authenticated";

grant references on table "public"."sessions" to "authenticated";

grant select on table "public"."sessions" to "authenticated";

grant trigger on table "public"."sessions" to "authenticated";

grant truncate on table "public"."sessions" to "authenticated";

grant update on table "public"."sessions" to "authenticated";

grant delete on table "public"."sessions" to "service_role";

grant insert on table "public"."sessions" to "service_role";

grant references on table "public"."sessions" to "service_role";

grant select on table "public"."sessions" to "service_role";

grant trigger on table "public"."sessions" to "service_role";

grant truncate on table "public"."sessions" to "service_role";

grant update on table "public"."sessions" to "service_role";


  create policy "authenticated read"
  on "public"."articles"
  as permissive
  for select
  to authenticated
using (true);



  create policy "owner access"
  on "public"."improvement_items"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (public.session_results sr
     JOIN public.sessions s ON ((s.id = sr.session_id)))
  WHERE ((sr.id = improvement_items.session_result_id) AND (s.user_id = auth.uid())))));



  create policy "owner access"
  on "public"."knowledge_gaps"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (public.session_results sr
     JOIN public.sessions s ON ((s.id = sr.session_id)))
  WHERE ((sr.id = knowledge_gaps.session_result_id) AND (s.user_id = auth.uid())))));



  create policy "owner access"
  on "public"."messages"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.sessions
  WHERE ((sessions.id = messages.session_id) AND (sessions.user_id = auth.uid())))));



  create policy "authenticated read"
  on "public"."scenarios"
  as permissive
  for select
  to authenticated
using (true);



  create policy "owner access"
  on "public"."session_results"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.sessions
  WHERE ((sessions.id = session_results.session_id) AND (sessions.user_id = auth.uid())))));



  create policy "owner access"
  on "public"."sessions"
  as permissive
  for all
  to authenticated
using ((user_id = auth.uid()));



