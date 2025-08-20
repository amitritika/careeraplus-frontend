# CareerPlus Frontend (Next.js + Tailwind + Storybook)

## Setup
```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Env
- `NEXT_PUBLIC_API_BASE` (default: http://localhost:8000)

## Scripts
- `npm run dev` — Next dev server at 3000
- `npm run storybook` — Storybook at 6006
- `npm run build-storybook` — Build static Storybook

## Notes
- Auth is cookie-based via backend; we call API with `credentials: 'include'`.
- Feed page fetches `/api/user/profile` on mount and redirects to `/login` on 401.

## Pages added
- `/signup` — calls pre-signup; in dev shows token
- `/auth/account/activate/[token]` — completes signup
- `/forgot` — starts reset; in dev shows token
- `/reset/[token]` — finishes reset
- `/account` — profile editor (name, about, photos, resume JSON)
- `/u/[username]` — public profile

