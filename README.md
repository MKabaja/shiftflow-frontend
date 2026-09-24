# SHIFTFlow — Frontend

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/tests-183%20passing-brightgreen)](#testing)

React SPA for managing employee shift schedules at Wieliczka Salt Mine — the client for the
[SHIFTFlow REST API](https://shiftflow-api.duckdns.org).

> **Status: work in progress.** The authentication flow, the design system and the application shell are done.
> The feature modules (availability, employees, positions, schedule grid) are not built yet — see
> [Roadmap](#roadmap).

---

## Live Deployment

| Service               | URL                                                                       |
| --------------------- | ------------------------------------------------------------------------- |
| Frontend (this repo)  | [shiftflow.duckdns.org](https://shiftflow.duckdns.org) — 🚧 not deployed yet |
| Backend API           | [shiftflow-api.duckdns.org](https://shiftflow-api.duckdns.org)            |

---

## About the Project

Wieliczka Salt Mine schedules employees across 27 specialised positions — ticket booths, parking wardens, tram
operators, guides. Until now that schedule was built by hand in Excel. The backend replaced the rules and the
storage; this repository is the interface that managers and employees actually use.

The application serves two very different audiences from one codebase. A manager sits at a desk and builds a
monthly schedule across a wide grid. An employee opens the app on a phone between shifts to declare availability
and check when they work next. Both flows share one responsive shell rather than two separate applications.

---

## Tech Stack

- **React** 19 + **TypeScript** 6 (strict, `noUnusedLocals` / `noUnusedParameters` / `erasableSyntaxOnly`)
- **Vite** 8 — dev server, build, same-origin API proxy
- **TanStack Router** — code-based routes with pathless layout routes and `beforeLoad` guards
- **TanStack Query** — server state, and the single source of truth for the session
- **Tailwind CSS** v4 — configured entirely in CSS, no JS config file
- **React Hook Form** + **Zod** v4 — form state and validation
- **i18next** + **react-i18next** — PL/EN, keys type-checked against the Polish locale files
- **Motion** — layout and entry animations, with `prefers-reduced-motion` handling
- **Axios** — HTTP transport with a session-expiry interceptor
- **Vitest** + **Testing Library** — unit and component tests in jsdom

---

## Architecture

### State — three layers, no overlap

```
Server state      → TanStack Query (users, schedules, availabilities)
Session           → TanStack Query as well — useMe / useAuth, no auth store
UI / client state → local state today; Zustand only where a value is shared,
                    non-server and genuinely global (first case: schedule toolbar)
```

The session deliberately has **no** Zustand store. `useAuth` is a thin wrapper over the `useMe` query, and the
router's `beforeLoad` awaits `ensureQueryData('/me')`, so a page refresh restores the session from the cookie
without a second copy of the user to keep in sync.

### Authentication

The API issues an httpOnly `jwt_token` cookie; the token is never read by JavaScript. Two entry points share it:
`/login` (login + password, for admins and managers) and `/login-pin` (login + PIN, for employees on a phone).

Route protection is layered:

```
_public      → visible to guests; an authenticated visitor is redirected to their landing path
_app         → requires a session; no session → redirect to /
  _panel     → admin / manager only
  _disposition → employee module
```

### Error handling — four layers

```
1. Axios interceptor  → only a session-death 401 (outside /auth/login*): clear cache, redirect
2. parseApiError      → pure fn: any error → an i18n key from the `errors` namespace
3. queryClient onError → fallback toast for anything a view does not handle itself
4. Mutation onError   → contextual: 422 → form fields, 401 on login → one generic message
```

Errors carry **i18n keys**, never backend prose. Translation happens at render, so switching language after a
failed request re-translates the message in place. Forms that show their own errors opt out of the global toast
with `meta: { handled: true }` and route everything into React Hook Form's `formState.errors` — field errors under
the field name, the rest under `root.serverError`. There is no second error channel to keep in sync.

### Design system

Dark neumorphic, with a "Mining Gold" accent (`#C9A347`) on a `#1E1E20` base. Tailwind v4 is configured through
CSS only: `src/css/theme.css` holds every token (colour palette, neumorphic shadow presets, z-index scale, type
scale) inside `@theme`, and components consume them as utilities (`shadow-nm-raised`, `text-display-md`).
Neumorphic shadows use alpha rather than hex, so the same token is correct on every surface it lands on.

Each shared component owns a folder: `Component.tsx`, `Component.styles.ts`, `index.ts`, `__tests__/`. Reusable
class strings (focus ring, disabled state) live in `src/shared/lib/styles/` and are imported, never re-typed.

---

## Project Structure

```
ShiftFlow_frontend/
├── src/
│   ├── routes/                 # One file per route — hand-wired createRoute + guards
│   ├── layouts/
│   │   ├── AppLayout.tsx       # One responsive shell: Sidebar on desktop, BottomNav on mobile
│   │   ├── AuthLayout.tsx
│   │   ├── components/         # Sidebar, BottomNav
│   │   └── navigation/         # navLinks config shared by both navigations
│   ├── features/
│   │   └── auth/
│   │       ├── api/            # useLogin, useLoginPin, useLogout, useChange*
│   │       ├── components/     # LandingPage, LoginForm, LoginPinForm, ProfileModal, AuthSplit
│   │       ├── hooks/          # useAuth
│   │       └── lib/            # schemas, applyServerError, landingPathFor, getCurrentUser
│   ├── shared/
│   │   ├── components/         # Alert, Avatar, Badge, Button, Card, ColorPicker, Input, Logo,
│   │   │                       # Modal, PinInput, Separator, Skeleton, Spinner, Splash, Toggle, …
│   │   ├── hooks/              # useModal (compositor), useFocusTrap, useRovingFocus, usePinInput, …
│   │   ├── i18n/               # i18next setup, locales/{pl,en}/*.json, typed key augmentation
│   │   ├── lib/
│   │   │   ├── config/         # axios, queryClient, queryKeys, router, config
│   │   │   ├── helpers/        # cn, parseApiError, getInitials, hashColor
│   │   │   └── styles/         # focusStyles, disabledStyles
│   │   └── types/              # API types
│   └── css/                    # Index.css → theme.css, globals.css, helpers.css
├── .github/workflows/ci.yml    # typecheck + lint + test + build
└── deploy.sh                   # build and rsync to Hetzner (manual fallback)
```

---

## Getting Started

**Prerequisites:** Node.js 20+ and a running SHIFTFlow backend (see the
[backend repository](https://github.com/MKabaja/SHIFTFlow) — `docker compose up -d`).

**1. Install**

```bash
git clone <repository-url>
cd ShiftFlow_frontend
npm install
```

There is nothing to configure — the application has no `.env` files. The API address is a relative `/api`, and
Vite proxies it to `http://localhost:8000` in development, so the browser sees one origin and the session cookie
is a first-party cookie in both environments.

**2. Run**

```bash
npm run dev
```

The application is served at `http://localhost:5173`.

**3. Log in**

Use a seeded backend account — `admin` / `password` for the panel, or an employee login with their PIN for the
mobile module. The full list is in the backend README.

### Scripts

| Command              | What it does                                             |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                                 |
| `npm run build`      | Type-check the project, then build for production        |
| `npm run typecheck`  | `tsc --noEmit`                                           |
| `npm run lint`       | ESLint across all `.ts` / `.tsx`, zero warnings allowed  |
| `npm run test:run`   | Run the test suite once                                  |
| `npm run check`      | typecheck + lint + tests + build — run before committing |

---

## Testing

```bash
npm run test:run
```

183 tests across 24 files, in jsdom. Coverage is concentrated where behaviour is easy to break silently: shared
component DOM contracts (ARIA attributes, conditional rendering, event handlers), the focus and keyboard hooks,
the 401 interceptor, `parseApiError` and `applyServerError`.

Tests assert behaviour, not appearance — no snapshots of Tailwind classes, no assertions about animations. View
and layout tests are deliberately deferred until the feature modules exist, so they can be written in one pass
instead of being rewritten as the screens change.

---

## Technical Decisions

**Session in the query cache, not in a store**
Keeping the user in both Zustand and TanStack Query meant two writes on login, two on logout, and a third path
through the 401 interceptor — three places to forget. The query cache already handles caching, invalidation and
request deduplication, so the store was removed and `useAuth` became a wrapper over `useMe`.

**Same-origin API instead of CORS**
The Vite dev server proxies `/api` to the backend, and on production nginx serves the SPA and forwards `/api` on
the same domain. The cookie is first-party everywhere, `SameSite=Lax` is enough, and the CORS configuration only
has to cover local development.

**No environment files**
Once the API address became relative, all four `.env` files held byte-identical values. They were replaced by
constants in `config.ts`, which are type-checked and reviewed like any other code. The application version is the
one build-time value that remains, and it is injected from `package.json` via Vite's `define` — a `.env` file
would have meant editing the version by hand in two places. If a value ever genuinely differs per environment, a
`.env` returns for that value alone.

**Error messages are keys, not text**
`parseApiError` maps every failure to a key from the `errors` namespace, and the key is translated at render.
This keeps Polish and English wording owned by the frontend, decouples the UI from backend phrasing, and makes
the language switcher work on messages that are already on screen.

**One responsive layout, not two**
An earlier plan had a desktop-only panel and a separate mobile module. They were merged into a single
`AppLayout` that swaps navigation at one breakpoint, because both roles turned out to need both widths — a
manager checks something on a phone, an employee opens the app on a desktop.

---

## Roadmap

The project ships branch by branch, each ending in a deploy. Done so far: project setup, the design system, and
the authentication flow (this includes the router, the guards, the application shell and the profile modal).

Next, in order:

- **Automated deploy** — GitHub Actions job on `main` replacing the manual `deploy.sh`
- **File-based routing** — migration from the current hand-wired route tree, before the CRUD work starts
- **Disposition module** — `/home`, the availability calendar with optimistic updates, a simple `/my-schedule`
- **Management CRUD** — employees master-detail with CSV import, positions with colour picker
- **Schedule grid** — the core manager feature: display, toolbar, shift mutations, availability overlay
- **Settings and full i18n** — password and PIN changes, locale persistence, error pages
- **Final polish** — performance and a11y audits, code-splitting, README screenshots
