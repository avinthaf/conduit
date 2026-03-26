---
name: Conduit project stack and conventions
description: Tech stack, shadcn config, component patterns, and file conventions for the Conduit AI app
type: project
---

**Stack**
- React + Vite + TypeScript
- shadcn/ui with Radix Nova style preset (Default color base: neutral)
- Tailwind CSS v4 — config is CSS-only via `src/index.css`, no `tailwind.config.ts`
- `lucide-react` (^1.7.0) for icons
- `@fontsource-variable/geist` for Geist (project default sans)
- `@fontsource/ibm-plex-mono` for IBM Plex Mono (Conduit UI font)

**Aliases**
- `@/components` → `src/components`
- `@/components/ui` → `src/components/ui`
- `@/lib` → `src/lib`

**shadcn/ui slot import**
Uses `import { Slot } from "radix-ui"` (not `@radix-ui/react-slot`) — this is the Radix Nova preset pattern.

**cva pattern**
- buttonVariants exported alongside Button from `src/components/ui/button.tsx`
- Base styles built as a joined string array for readability, then passed to `cva(base, { variants })`
- Tailwind arbitrary values used for all Conduit design tokens (e.g. `bg-[#18181b]`, `rounded-[4px]`)

**Component inventory (as of 2026-03-26)**
All components live in `src/components/ui/`:
- `button.tsx` — cva variants: primary, secondary, destructive, endCall, ghost, navActive, navInactive
- `badge.tsx` — cva variants: completed, live (animated pulse dot), grade, toolCallBlue, toolCallAmber, difficulty
- `input.tsx` — multi-variant single file: default, search, error, password (strength bar), chat (send button slot)
- `transcript-row.tsx` — speaker turn row (customer=blue dot, trainee=green dot)
- `tool-call-card.tsx` — AI tool result card (kb=blue badge, sop/escalation=amber badge)
- `stat-card.tsx` — single metric display (value + optional suffix + label)
- `score-bar.tsx` — labeled progress bar, green/amber variant
- `knowledge-gap-card.tsx` — post-session gap card with toolCallBlue badge and article link
- `waveform.tsx` — 20-bar audio waveform, active prop triggers staggered pulse animation
- `avatar.tsx` — circular avatar, initials fallback, sm/md/lg sizes
- `session-timer.tsx` — pure display MM:SS formatter, exports `formatTime` utility

**Why:** Radix Nova preset uses newer radix-ui monorepo package. Tailwind v4 CSS-only config means all theme tokens live in `src/index.css` inside `@theme inline {}`.

**How to apply:** When adding new shadcn components with `npx shadcn-ui@latest add`, check that Slot imports use the Radix Nova pattern. Always extend existing CVA variants rather than creating separate component files. No barrel index files — import each component by its direct path.
