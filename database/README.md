# LuminaPath AI Database

Run migrations:

```bash
npm run migrate --workspace backend
```

Seed demo records:

```bash
npm run seed --workspace backend
```

The schema is optimized around learning workflows:

- role-filtered user queries
- course approval queues
- ordered lessons
- learner progress lookups
- assignment review queues
- weak topic detection
- AI artifact history
- audit investigations

Migrations live in `database/migrations`.
