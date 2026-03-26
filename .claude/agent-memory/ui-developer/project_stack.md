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

**Why:** Radix Nova preset uses newer radix-ui monorepo package. Tailwind v4 CSS-only config means all theme tokens live in `src/index.css` inside `@theme inline {}`.

**How to apply:** When adding new shadcn components with `npx shadcn-ui@latest add`, check that Slot imports use the Radix Nova pattern. Always extend existing CVA variants rather than creating separate component files.
