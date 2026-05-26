insert into users (id, email, name, password_hash, role, email_verified) values
  ('11111111-1111-4111-8111-111111111111', 'student@luminapath.ai', 'Maya Student', '$2b$10$w9T8xM7Kxj80L9/3Jd7R5OlFGx4cI4.vRGlSYL5f3DHNYFHHR2IKG', 'student', true),
  ('22222222-2222-4222-8222-222222222222', 'instructor@luminapath.ai', 'Ira Instructor', '$2b$10$w9T8xM7Kxj80L9/3Jd7R5OlFGx4cI4.vRGlSYL5f3DHNYFHHR2IKG', 'instructor', true),
  ('33333333-3333-4333-8333-333333333333', 'admin@luminapath.ai', 'Noor Admin', '$2b$10$w9T8xM7Kxj80L9/3Jd7R5OlFGx4cI4.vRGlSYL5f3DHNYFHHR2IKG', 'admin', true)
on conflict (email) do nothing;

insert into courses (id, instructor_id, title, slug, summary, level, status, price_cents, published_at) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '22222222-2222-4222-8222-222222222222', 'AI Product Engineering', 'ai-product-engineering', 'Build AI products with evaluation loops, UX safeguards, and production APIs.', 'Intermediate', 'approved', 7900, now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '22222222-2222-4222-8222-222222222222', 'Data Systems for Builders', 'data-systems-for-builders', 'PostgreSQL, Redis, analytics, and scaling patterns for modern apps.', 'Advanced', 'approved', 9900, now())
on conflict (slug) do nothing;

insert into lessons (course_id, title, position, content_kind, duration_minutes, transcript) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Designing an AI learning loop', 1, 'video', 14, 'Learning objectives, evaluation, and feedback loops.'),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Prompt contracts and response validation', 2, 'article', 18, 'Structured outputs and validation strategies.'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Indexes that match learner queries', 1, 'video', 22, 'B-tree, composite indexes, and query plans.')
on conflict do nothing;

insert into enrollments (user_id, course_id, progress_percent) values
  ('11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 68.00)
on conflict do nothing;
