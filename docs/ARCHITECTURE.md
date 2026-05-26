# Architecture Notes

LuminaPath AI uses a modular monorepo:

- `frontend`: Next.js app router, role dashboards, chart components, theme system.
- `backend`: Express API with typed middleware, JWT auth, OpenAI workflows, and catalog/platform routes.
- `database`: raw SQL migrations for predictable Postgres operations.

## Request Flow

```mermaid
sequenceDiagram
  actor Learner
  participant Web as Next.js
  participant API as Express API
  participant DB as PostgreSQL
  participant AI as OpenAI
  Learner->>Web: Opens dashboard
  Web->>API: Authenticated request
  API->>DB: Fetch progress and weak topics
  API->>AI: Generate plan or artifact
  AI-->>API: Structured JSON
  API-->>Web: Learning graph response
  Web-->>Learner: Dashboard, chart, recommendation
```

## Scalability

- Stateless API containers scale horizontally.
- PostgreSQL owns durable learning records.
- Redis supports caching, session hints, and rate-limit coordination.
- Audit logs separate operational traceability from feature tables.
- AI artifact records enable history, observability, and evaluation.
