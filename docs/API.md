# LuminaPath AI API

Base URL: `http://localhost:8080/api`

All mutating routes require the `x-csrf-token` header when cookie auth is used. Bearer-token clients may pass `Authorization: Bearer <accessToken>`.

## Auth

### Register

`POST /auth/register`

```json
{
  "name": "Maya Student",
  "email": "student@example.com",
  "password": "StrongPass#2026",
  "role": "student"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "student@luminapath.ai",
  "password": "Luminapath#2026"
}
```

### Google Login

`POST /auth/google`

```json
{
  "credential": "google-id-token"
}
```

Requires `GOOGLE_CLIENT_ID`.

## Courses

- `GET /courses`
- `POST /courses`
- `POST /courses/:courseId/enroll`
- `PATCH /courses/:courseId/progress`
- `POST /courses/:courseId/bookmarks`

## AI

`POST /ai/:mode`

Supported modes:

- `study-planner`
- `quiz-generator`
- `career-roadmap`
- `resume-ats`
- `mock-interview`
- `flashcards`
- `recommendations`

```json
{
  "prompt": "Prepare me for a junior backend engineer interview",
  "context": {
    "weeklyHours": 8,
    "weakTopics": ["Redis", "indexes"]
  }
}
```

When `OPENAI_API_KEY` is absent, the API returns deterministic demo output so local development and tests remain stable.

## Platform

- `GET /platform/identity`
- `GET /platform/student/dashboard`
- `GET /platform/instructor/analytics`
- `GET /platform/admin/analytics`
- `GET /platform/notifications`
- `GET /platform/study-rooms`
