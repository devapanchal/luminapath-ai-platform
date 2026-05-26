# Contributing to LuminaPath AI

Use feature branches from `main`, keep pull requests focused, and include validation notes. Backend changes should include API tests or a clear reason when tests are not practical. UI changes should include responsive screenshots for desktop and mobile.

## Branching

- `main`: production-ready code
- `codex/*`: AI-assisted implementation branches
- `feature/*`: human-authored feature work
- `fix/*`: production fixes

## Local Validation

```bash
npm install
npm run check --workspaces --if-present
npm test --workspaces --if-present
npm run build --workspaces --if-present
```

## Review Standard

Every PR should state the user-facing change, security impact, database migration impact, and deployment considerations.
