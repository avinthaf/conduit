# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is a monorepo. The frontend lives in `conduitc/`. Future directories (e.g. `conduitb/`) will hold backend services in non-JavaScript runtimes.

```
conduit/
  design.pen          ← Source of truth for all UI design (pencil.dev, use pencil MCP tools to read)
  .claude/
    agents/           ← designer, ui-developer, frontend-developer subagents
    agent-memory/     ← persistent memory for subagents
  conduitc/           ← React frontend
```

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
  lib/utils.ts        ← cn() helper
  index.css           ← Tailwind imports + shadcn tokens + @theme inline
  App.tsx             ← root; swap which page is rendered here during development
  ComponentLibraryPreview.tsx  ← visual showcase of all components
```

### Component hierarchy

Pages compose from `src/components/ui/`. Before writing any UI, always glob `src/components/ui/` and read relevant files — never recreate inline what already exists. Priority order: project components → shadcn/ui → raw HTML.

### Design file

`design.pen` at the repo root is the source of truth for all screen layouts. Use the **pencil MCP tools** (`batch_get`, `get_screenshot`) to read it — never use `Read` or `Grep` on `.pen` files. When building or iterating on a screen, always read the corresponding screen from `design.pen` first; the design overrides any text description if they conflict.
