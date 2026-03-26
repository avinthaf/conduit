---
name: Input component omits `type` prop — use raw <input> for email/password
description: The shared Input component derives `type` from `variant` and omits `type` from its TypeScript interface, so email and password fields must use raw <input> elements styled to match variant="default"
type: feedback
---

The `Input` component in `src/components/ui/input.tsx` does `Omit<React.ComponentProps<"input">, "type">` and hardcodes the input type internally based on `variant`. The `"default"` variant always produces `type="text"`, and `"password"` variant produces `type="password"` but also renders an unwanted strength bar.

**Why:** This means you cannot pass `type="email"` or `type="password"` to the `Input` component — TypeScript won't accept it, and the DOM value would be overridden anyway.

**How to apply:** For email and password fields on auth pages, use a raw `<input>` element directly, copying the exact class composition of the `default` variant:

```
"w-full h-10 bg-[#18181b] text-[oklch(0.985_0_0)] border border-[#27272a] rounded-[4px] font-mono text-[13px] placeholder:text-[#52525b] px-3 outline-none transition-colors duration-150 focus:border-[#3f3f46] disabled:pointer-events-none disabled:opacity-40"
```

Pair it with a manually written `<label>` using the same label styles the component uses: `font-mono text-[12px] font-medium text-[#a1a1aa] leading-none`.
