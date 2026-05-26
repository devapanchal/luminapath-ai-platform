# Deployment Guide

## Frontend: Netlify or Vercel

1. Set project base directory to `frontend`.
2. Configure `NEXT_PUBLIC_API_URL=https://your-api.example.com/api`.
3. Build command: `npm run build`.
4. For Netlify, install `@netlify/plugin-nextjs` or use the included `frontend/netlify.toml`.

## Backend: Render or Railway

1. Deploy from `backend/Dockerfile`, or use the Node build command:

```bash
npm install
npm run build --workspace backend
npm run start --workspace backend
```

2. Add PostgreSQL and Redis services.
3. Configure secrets from `.env.example`.
4. Run:

```bash
npm run migrate --workspace backend
npm run seed --workspace backend
```

## Health Checks

- API: `/health`
- Frontend: `/`
- Auth smoke test: `POST /api/auth/login`
- AI smoke test: `POST /api/ai/study-planner`
