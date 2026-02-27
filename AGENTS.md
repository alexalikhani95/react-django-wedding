# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: Django 5 API. Core config is in `backend/core/`; domain apps are `rsvp/`, `guests/`, `tables/`, and `costs/` (each with `models.py`, `views.py`, `serializers.py`, `urls.py`, `tests.py`).
- `frontend/`: React + TypeScript (Vite). Route screens live in `frontend/src/routes/`, shared UI in `frontend/src/components/`, API/query logic in `frontend/src/**/queries/`, and test helpers in `frontend/src/utils/` + `frontend/test/setup.ts`.
- `frontend/e2e/`: Playwright end-to-end specs.
- Root deployment files: `build.sh` (Render build steps) and `render.yaml`.

## Build, Test, and Development Commands
- Backend setup: `python3 -m venv venv && source venv/bin/activate && pip install -r backend/requirements.txt`
- Run backend: `cd backend && python manage.py runserver`
- Backend tests: `cd backend && python manage.py test`
- Backend coverage: `cd backend && coverage run manage.py test && coverage report -m`
- Frontend setup: `cd frontend && npm install`
- Frontend dev server: `npm run dev`
- Frontend unit tests: `npm run test`
- Frontend e2e tests: `npm run e2e-test`
- Frontend production build: `npm run build`
- Lint/format: `npm run lint-format`

## Coding Style & Naming Conventions
- Frontend formatting/linting is enforced by Biome (`frontend/biome.json`): 2-space indentation, double quotes, semicolons as needed, import organization enabled.
- Use `PascalCase` for React components (`SeatingDesktop.tsx`), `camelCase` for variables/functions, and descriptive test names.
- Backend Python follows standard Django/PEP 8 conventions: 4-space indentation, `snake_case` for functions/fields, `PascalCase` for models/serializers.

## Testing Guidelines
- Backend: Django test runner (`python manage.py test`), with tests in each app’s `tests.py`.
- Frontend unit/integration: Vitest + Testing Library (`*.test.tsx` in `src/routes/...`).
- Frontend e2e: Playwright (`frontend/e2e/*.spec.ts`).
- Prefer behavior-focused test names (example: `test("filters guests by search term", ...)`).

## Commit & Pull Request Guidelines
- Recent commits are short, imperative, and task-focused (for example: `Fix lint issues`, `Setup storybook...`, `Run lint format`). Follow this style.
- Keep commits scoped to one logical change.
- PRs should include:
  - concise summary and motivation,
  - linked issue/ticket (if applicable),
  - test evidence (command output or checklist),
  - screenshots/video for UI changes.

## Security & Configuration Tips
- Backend config is environment-driven (`backend/core/settings.py`): set `SECRET_KEY`, `DEBUG`, `DATABASE_URL`, email credentials, and notification recipients via env vars.
- Keep secrets in `backend/.env` (local only); never commit credentials.
