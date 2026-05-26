create extension if not exists "uuid-ossp";

create type user_role as enum ('student', 'instructor', 'admin');
create type course_status as enum ('draft', 'pending', 'approved', 'rejected', 'archived');
create type submission_status as enum ('submitted', 'reviewed', 'needs_revision');

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text not null,
  password_hash text not null,
  role user_role not null default 'student',
  avatar_url text,
  email_verified boolean not null default false,
  google_subject text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table refresh_tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  family_id uuid default uuid_generate_v4(),
  user_agent text,
  ip_address inet,
  revoked_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table courses (
  id uuid primary key default uuid_generate_v4(),
  instructor_id uuid not null references users(id),
  title text not null,
  slug text not null unique,
  summary text not null,
  level text not null,
  status course_status not null default 'draft',
  cover_asset_url text,
  price_cents integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  position integer not null,
  content_kind text not null check (content_kind in ('video', 'pdf', 'article', 'quiz', 'project')),
  asset_url text,
  duration_minutes integer not null default 0,
  transcript text,
  unique (course_id, position)
);

create table enrollments (
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  progress_percent numeric(5,2) not null default 0,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (user_id, course_id)
);

create table lesson_progress (
  user_id uuid not null references users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed boolean not null default false,
  watch_seconds integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table assignments (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  rubric jsonb not null default '{}'::jsonb,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table submissions (
  id uuid primary key default uuid_generate_v4(),
  assignment_id uuid not null references assignments(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  asset_url text,
  body text,
  ai_feedback jsonb,
  score numeric(5,2),
  status submission_status not null default 'submitted',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique (assignment_id, user_id)
);

create table ai_artifacts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  kind text not null,
  prompt text not null,
  result jsonb not null,
  model text,
  created_at timestamptz not null default now()
);

create table weak_topic_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  topic text not null,
  confidence numeric(5,2) not null,
  evidence jsonb not null default '{}'::jsonb,
  detected_at timestamptz not null default now()
);

create table study_rooms (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  host_user_id uuid references users(id) on delete set null,
  room_type text not null check (room_type in ('peer', 'tutor', 'interview', 'project')),
  starts_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb
);

create table audit_logs (
  id bigserial primary key,
  actor_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_users_role_created on users(role, created_at desc);
create index idx_courses_status_published on courses(status, published_at desc);
create index idx_lessons_course_position on lessons(course_id, position);
create index idx_enrollments_user_progress on enrollments(user_id, progress_percent desc);
create index idx_submissions_assignment_status on submissions(assignment_id, status);
create index idx_weak_topics_user_topic on weak_topic_events(user_id, topic, detected_at desc);
create index idx_ai_artifacts_user_kind on ai_artifacts(user_id, kind, created_at desc);
create index idx_audit_logs_entity on audit_logs(entity_type, entity_id, created_at desc);
