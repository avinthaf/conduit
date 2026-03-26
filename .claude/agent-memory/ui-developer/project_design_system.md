---
name: Conduit AI design system tokens
description: Core color palette, typography, radius, and spacing tokens for the Conduit AI customer service training app
type: project
---

Dark-first design system for Conduit AI. All UI is built on a near-black background.

**Colors**
- Background: `#0a0a0a`
- Surface/card: `#111111`
- Borders: `#27272a` (zinc-800)
- Text primary: `oklch(0.985 0 0)` (near-white)
- Text muted: `#a1a1aa` (zinc-400)
- Accent green: `#22c55e`
- Accent amber: `#f59e0b`
- Accent red: `#ef4444`
- Accent blue: `#3b82f6`

**Typography**
- Primary typeface: IBM Plex Mono (all text, all sizes/weights)
- Installed as `@fontsource/ibm-plex-mono` (weights 400 and 500 imported in `src/index.css`)
- Registered as `--font-mono` in Tailwind `@theme inline` block
- Use `font-mono` utility class on all Conduit components

**Spacing / radius**
- Base grid: 4px
- Border radius on cards/buttons: 4px (`rounded-[4px]`)
- Border radius on pills (e.g. EndCall): 100px (`rounded-[100px]`)

**Why:** Customer service training app with a terminal/console aesthetic; monospace font and near-black palette reinforce focus on call transcripts and AI feedback.

**How to apply:** Always start from these tokens when building new components. Do not pull in the shadcn CSS variable theme colors (--primary, --secondary, etc.) for Conduit-specific UI — use the hardcoded design tokens above directly.
