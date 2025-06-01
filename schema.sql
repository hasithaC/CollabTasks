-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.comments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  creator_id uuid,
  content text,
  task_id bigint,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id),
  CONSTRAINT comments_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id)
);
CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  description text,
  priority USER-DEFINED DEFAULT 'medium'::priority_level,
  status USER-DEFINED DEFAULT 'pending'::task_status,
  creator_id uuid,
  assignee_id uuid,
  CONSTRAINT tasks_pkey PRIMARY KEY (id),
  CONSTRAINT tasks_assigneeId_fkey FOREIGN KEY (assignee_id) REFERENCES public.users(id),
  CONSTRAINT tasks_creatorId_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  email text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);