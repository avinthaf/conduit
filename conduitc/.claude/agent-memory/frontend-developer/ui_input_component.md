---
name: Input component API
description: Conduit Input component variants, props, and key design decisions — especially how type and strength props work
type: project
---

`src/components/ui/input.tsx` — five variants: `default`, `search`, `error`, `password`, `chat`.

**Key props:**
- `type?: React.HTMLInputTypeAttribute` — explicit type always wins; otherwise derived from variant (`password` → `"password"`, `search` → `"search"`, else `"text"`). This was previously `Omit`-ted so callers couldn't pass `type="email"`.
- `strength?: number` (0–100) — the strength bar renders ONLY when this prop is explicitly provided AND `variant === "password"`. Omitting it gives a plain password field. This is the gate — no separate `showStrength` flag needed.
- `errorMessage?: string` — renders below the field on any variant (previously only `"error"` variant). Used directly in `default` and `password` variants.
- `label?: string` — rendered above in 12px zinc-400 mono.
- `onSend?: () => void` — chat variant only.

**Strength bar detail:** the label text color is derived by replacing `bg-` with `text-` in the `strengthColor()` return value. Works because all three colors are plain `bg-[hex]` with no other `bg-` in the string.

**Why:** Login needed `variant="password"` without the strength bar; SignUp needed `type="email"` on a default field. Both previously used raw `<input>` fallbacks with duplicated class strings.
