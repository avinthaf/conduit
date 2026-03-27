# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is a monorepo. The frontend lives in `conduitc/` and the Python backend in `conduitb/`.

```
conduit/
  design.pen          ← Source of truth for all UI design (pencil.dev, use pencil MCP tools to read)
  .claude/
    agents/           ← all subagents: designer, ui-developer, frontend-developer, backend-developer
    agent-memory/     ← persistent memory for subagents (one subfolder per agent)
  conduitc/           ← React frontend
  conduitb/           ← Python/Flask backend
  lk-agents/
    customer-agent/   ← LiveKit agent: simulates the customer persona
    coach-agent/      ← LiveKit agent: observes session and coaches the trainee
```

---

## conduitc — Frontend

### Commands (run from `conduitc/`)

```bash
npm run dev       # start Vite dev server
npm run build     # type-check + production build
npm run lint      # ESLint
npm run preview   # preview production build
```

### Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite` — no `tailwind.config.js`, configured entirely in `src/index.css` via `@theme inline`
- **shadcn/ui** (Radix, Default preset) — component registry at `components.json`
- **IBM Plex Mono** as the sole typeface (`font-mono` class everywhere — body, headings, inputs, buttons)
- **lucide-react** for all icons
- **class-variance-authority** (`cva`) for component variants
- `cn()` utility at `src/lib/utils.ts` for className merging

### Path alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

### Design tokens (dark-mode-first)

All pages use a near-black dark background. Key raw values used throughout — do not substitute Tailwind semantic names for these:

| Token | Value |
|---|---|
| Page background | `#0a0a0a` |
| Card surface | `#111111` |
| Elevated surface | `#18181b` |
| Border | `#27272a` |
| Text primary | `oklch(0.985 0 0)` |
| Text muted | `#a1a1aa` |
| Text placeholder | `#52525b` |
| Green (live/success) | `#22c55e` |
| Amber (warning/SOP) | `#f59e0b` |
| Red (destructive) | `#ef4444` |
| Blue (KB/info) | `#3b82f6` |

### Tailwind class conventions

- `rounded-[4px]` → use `rounded-lg`
- `rounded-[2px]` → use `rounded-xs`
- `max-w-[400px]` → use `max-w-100`
- Avoid arbitrary `py-[Npx]` — use Tailwind scale (e.g. `py-2.5` not `py-[10px]`)
- Theming is `.dark` class-based, not `prefers-color-scheme`

### TypeScript notes

- `React.FormEvent` is deprecated in this project's TS version — always use `React.SyntheticEvent<HTMLFormElement>` for form submit handlers
- Strict mode is on; `noUnusedLocals` and `noUnusedParameters` are enforced

### src/ layout

```
src/
  pages/              ← full screens (Login, SignUp, Dashboard, ActiveSession, PostSessionReview)
  components/ui/      ← design-system components (button, badge, input, waveform, etc.)
  context/
    AuthContext.tsx   ← AuthProvider, useAuth() hook, ProtectedRoute
  lib/
    api.ts            ← all backend fetch calls; base URL http://127.0.0.1:5000
    supabase.ts       ← Supabase client singleton (reads VITE_SUPABASE_URL / VITE_SUPABASE_KEY)
    utils.ts          ← cn() helper
  index.css           ← Tailwind imports + shadcn tokens + @theme inline
  App.tsx             ← root router; public routes + ProtectedRoute layout route
  ComponentLibraryPreview.tsx  ← visual showcase of all components
```

### Authentication

Auth is implemented with `@supabase/supabase-js`. The local Supabase instance API runs on port **54321** (Studio is on 54323 — do not use that port in env vars).

- **`src/lib/supabase.ts`** — exports a single `supabase` client instance.
- **`src/context/AuthContext.tsx`** — exports `AuthProvider` (wraps the app in `main.tsx`), `useAuth()` hook, and `ProtectedRoute` (layout route that redirects unauthenticated users to `/login`).
- `useAuth()` returns `{ session, user, loading, signIn, signUp, signInWithGoogle, signOut }`.
- Session is hydrated on mount via `supabase.auth.getSession()` and kept reactive via `onAuthStateChange`. Navigation after sign-in/sign-up happens automatically because `ProtectedRoute` reacts to session changes.
- Routes in `App.tsx`: `/login` and `/signup` are public; all other routes are nested under `<ProtectedRoute>`.
- Email confirmation is **disabled** — `signUp` resolves a session immediately.
- `conduitc/.env` must contain `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` (Vite only reads env from the `conduitc/` directory, not the repo root).

### Backend API layer

All backend calls go through `src/lib/api.ts` (base URL `http://127.0.0.1:5000`). Add new backend functions here — never write raw `fetch` calls in components or pages.

### Component hierarchy

Pages compose from `src/components/ui/`. Before writing any UI, always glob `src/components/ui/` and read relevant files — never recreate inline what already exists. Priority order: project components → shadcn/ui → raw HTML.

### Design file

`design.pen` at the repo root is the source of truth for all screen layouts. Use the **pencil MCP tools** (`batch_get`, `get_screenshot`) to read it — never use `Read` or `Grep` on `.pen` files. When building or iterating on a screen, always read the corresponding screen from `design.pen` first; the design overrides any text description if they conflict.

---

## conduitb — Backend

### Commands (run from `conduitb/`)

```bash
python main.py                  # start Flask dev server (port 5000)
pip install -r requirements.txt # install dependencies
```

### Stack

- **Flask 3.1.1** with app factory pattern (`create_app()` in `app/__init__.py`)
- **Supabase** (`supabase-py`) for all database access — no ORM, no migrations by hand
- **livekit-api** for LiveKit token generation
- **python-dotenv** loading from `conduitb/.env`

### Environment variables (`conduitb/.env`)

```
SUPABASE_URL=
SUPABASE_KEY=
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
```

### Architecture — strict 3-layer

Every feature spans exactly three files:

| Layer | Location | Rule |
|---|---|---|
| **Routes** (presentation) | `app/routes/<domain>.py` | Parses request, calls service, returns JSON. No business logic, no DB calls. |
| **Services** (business logic) | `app/services/<domain>_service.py` | Orchestrates use cases. Calls repositories only — never the Supabase client directly. |
| **Repositories** (data access) | `app/repositories/<domain>_repo.py` | All Supabase calls live here. Returns plain dicts or dataclasses — never raw Supabase response objects. |

Singletons for external clients live in `app/repositories/` alongside repos: `supabase.py` exports the `supabase` client, `livekit.py` exports `LIVEKIT_URL/API_KEY/API_SECRET`.

### Current API endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/scenarios` | List all scenarios |
| `POST` | `/api/sessions` | Create a session — body: `{ user_id, scenario_id }` |
| `POST` | `/api/livekit/token` | Generate LiveKit room token — body: `{ session_id, user_id, name? }` |

The LiveKit token endpoint uses the session's UUID as the room name. LiveKit auto-creates rooms on first join.

### Schema management

Schemas are managed declaratively in `supabase/schemas/` as `.sql` files. Never write raw migration files by hand.

**Workflow when adding or changing a table:**
1. Edit (or create) the file in `supabase/schemas/`
2. `supabase db diff -f <migration_name>` — generates the migration
3. `supabase migration up` — applies locally
4. `supabase db push` — deploys to production

RLS policies belong in the schema files alongside their tables.

---

## lk-agents — LiveKit Agents

### Commands (run from the individual agent directory, e.g. `lk-agents/customer-agent/`)

```bash
uv sync                              # install dependencies
uv run src/agent.py download-files  # download VAD + turn-detector models (first run only)
uv run src/agent.py dev             # dev mode — connects to LiveKit Cloud
uv run src/agent.py start           # production mode
```

### Stack

- **livekit-agents** with the STT-LLM-TTS pipeline (Deepgram → GPT-4.1 mini → Cartesia)
- **uv** for dependency and virtualenv management (each agent has its own `pyproject.toml`)
- Credentials loaded from `.env.local` (copy from `.env.example`)

### Agents

| Agent | Name | Role |
|---|---|---|
| `customer-agent` | `customer-agent` | Plays the customer persona; dispatched explicitly with scenario `prompt` JSON as job metadata |
| `coach-agent` | `coach-agent` | Silent observer; interjects with live coaching for the trainee and debriefs at end of session |

### Dispatch

Both agents use explicit dispatch (not automatic). They are dispatched via the `POST /api/livekit/token` flow or directly via `AgentDispatchService`. Job metadata must be a JSON string matching the scenario `prompt` column shape:

```json
{
  "system": "...",
  "persona": "...",
  "objectives": ["..."]
}
```
