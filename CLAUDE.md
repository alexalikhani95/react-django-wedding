# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend
```bash
source venv/bin/activate                          # activate virtual environment
cd backend && python manage.py runserver          # run dev server
cd backend && python manage.py test               # run all tests
cd backend && python manage.py test <app>.tests   # run single app's tests (e.g. guests.tests)
cd backend && coverage run manage.py test && coverage report -m  # test coverage
```

### Frontend
```bash
cd frontend && npm run dev           # dev server (Vite, port 5173)
cd frontend && npm run test          # unit tests (Vitest)
cd frontend && npm run e2e-test      # Playwright e2e tests
cd frontend && npm run e2e-test-ui   # Playwright with UI
cd frontend && npm run lint-format   # Biome lint + format
cd frontend && npm run build         # production build
cd frontend && npm run storybook     # Storybook component explorer
```

## Architecture

**Backend:** Django 5 REST API. Domain apps are `rsvp/`, `guests/`, `tables/`, `costs/` — each contains `models.py`, `views.py`, `serializers.py`, `urls.py`, `tests.py`. Core config (settings, root URLs) lives in `backend/core/`.

**Frontend:** React 19 + TypeScript SPA built with Vite. Key layout:
- `src/routes/` — page-level components (one per route)
- `src/components/` — shared UI components
- `src/**/queries/` — TanStack React Query hooks and fetch logic

**API communication:** Plain `fetch` calls in query files, wrapped with TanStack React Query. Base URL comes from `VITE_API_URL` env var (default `http://localhost:8000`). No auth on endpoints — access control is a frontend-only access code stored in localStorage.

**Data models:**
- `Rsvp` — guest RSVP with attendance flags, menu choices (starter/main/dessert), and allergy info
- `Guest` — wedding guest with party affiliation (bride/groom), optional FK to `Table` + `seat_number`
- `Table` — fixed capacity of 10; has 10 related `Seat` rows
- `Seat` — joins `Table` + `Guest` with a unique `(table, seat_number)` constraint
- `CostItem` — wedding expense with `total_amount`, `paid_amount`, computed `remaining_amount`

**Deployment:** Backend on Render (Gunicorn + Uvicorn ASGI worker), frontend on Vercel. `build.sh` runs `collectstatic` + `migrate` on deploy. Database is PostgreSQL (Neon) in production, SQLite in local/CI.

## Code Style

**Frontend:** Biome enforces 2-space indent, double quotes, no semicolons, and import sorting. Run `npm run lint-format` before committing.

**Backend:** Standard Django/PEP 8 — 4-space indent, `snake_case` for fields/functions, `PascalCase` for models/serializers.

**Commits:** Short, imperative, single-concern (e.g. `Fix seat assignment bug`, `Add cost delete endpoint`).
