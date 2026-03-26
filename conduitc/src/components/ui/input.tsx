import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Search, AlertCircle, Send } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — Input component
 *
 * Variants:
 *   default  — 40px tall, zinc-900 bg, zinc-800 border, IBM Plex Mono 13px
 *   search   — default + Search icon prefix (left-padded)
 *   error    — red border + AlertCircle suffix, errorMessage prop below
 *   password — default + strength bar below (strength 0–100 prop)
 *   chat     — full-width, no label, right-aligned send button slot
 */

// ---------------------------------------------------------------------------
// Shared field base classes
// ---------------------------------------------------------------------------
const fieldBase = [
  "w-full h-10",
  "bg-[#18181b] text-[oklch(0.985_0_0)]",
  "border border-[#27272a]",
  "rounded-[4px]",
  "font-mono text-[13px]",
  "placeholder:text-[#52525b]",
  "outline-none",
  "transition-colors duration-150",
  "focus:border-[#3f3f46]",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ")

// ---------------------------------------------------------------------------
// Variant-level wrapper config (used for the wrapping div where needed)
// ---------------------------------------------------------------------------
const inputVariants = cva(fieldBase, {
  variants: {
    variant: {
      default: "px-3",
      search: "pl-9 pr-3",
      error: "px-3 pr-9 border-[#ef4444] focus:border-[#ef4444]",
      password: "px-3",
      chat: "px-3 pr-12",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// ---------------------------------------------------------------------------
// Strength bar helpers
// ---------------------------------------------------------------------------
function strengthLabel(strength: number): string {
  if (strength < 34) return "Weak"
  if (strength < 67) return "Fair"
  return "Strong"
}

function strengthColor(strength: number): string {
  if (strength < 34) return "bg-[#ef4444]"
  if (strength < 67) return "bg-[#f59e0b]"
  return "bg-[#22c55e]"
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface InputBaseProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  /** Label rendered above the field in 12px zinc-400 */
  label?: string
  /**
   * Error message rendered below the field in 11px red.
   * Works on any variant — not just "error".
   */
  errorMessage?: string
  /**
   * Password strength 0–100 (password variant only).
   * The strength bar is rendered only when this prop is explicitly provided.
   */
  strength?: number
  /** Callback fired when the send button is pressed (chat variant only) */
  onSend?: () => void
}

function Input({
  className,
  variant = "default",
  label,
  errorMessage,
  strength,
  onSend,
  type,
  ...props
}: InputBaseProps) {
  // Derive the HTML input type: explicit `type` prop always wins, otherwise
  // fall back to a sensible default based on the variant.
  const inputType: React.HTMLInputTypeAttribute =
    type ??
    (variant === "password"
      ? "password"
      : variant === "search"
        ? "search"
        : "text")

  // The strength bar is shown only when the caller explicitly passes `strength`
  // AND the variant is "password".
  const showStrengthBar = variant === "password" && strength !== undefined
  const strengthValue = strength ?? 0

  // -------------------------------------------------------------------------
  // Default & password — simple single-field layout
  // -------------------------------------------------------------------------
  if (variant === "default" || variant === "password") {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-mono text-[12px] font-medium text-[#a1a1aa] leading-none">
            {label}
          </label>
        )}

        <input
          type={inputType}
          className={cn(inputVariants({ variant }), className)}
          {...props}
        />

        {showStrengthBar && (
          <div className="flex items-center gap-2 mt-0.5">
            {/* Track */}
            <div className="flex-1 h-1 rounded-xs bg-[#27272a] overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-xs transition-all duration-300",
                  strengthColor(strengthValue)
                )}
                style={{ width: `${Math.min(100, Math.max(0, strengthValue))}%` }}
                role="progressbar"
                aria-valuenow={strengthValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Password strength"
              />
            </div>
            <span
              className={cn(
                "font-mono text-[11px] font-medium leading-none",
                strengthColor(strengthValue)
                  .replace("bg-", "text-")
              )}
            >
              {strengthLabel(strengthValue)}
            </span>
          </div>
        )}

        {errorMessage && (
          <p
            role="alert"
            className="font-mono text-[11px] text-[#ef4444] leading-none"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Search — icon prefix inside the field
  // -------------------------------------------------------------------------
  if (variant === "search") {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-mono text-[12px] font-medium text-[#a1a1aa] leading-none">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#52525b] pointer-events-none"
          />
          <input
            type="search"
            className={cn(inputVariants({ variant }), className)}
            {...props}
          />
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Error — red border + AlertCircle suffix
  // -------------------------------------------------------------------------
  if (variant === "error") {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-mono text-[12px] font-medium text-[#a1a1aa] leading-none">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            type={inputType}
            aria-invalid="true"
            aria-describedby={errorMessage ? "input-error-msg" : undefined}
            className={cn(inputVariants({ variant }), className)}
            {...props}
          />
          <AlertCircle
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-[#ef4444] pointer-events-none"
          />
        </div>

        {errorMessage && (
          <p
            id="input-error-msg"
            role="alert"
            className="font-mono text-[11px] text-[#ef4444] leading-none"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Chat — full-width, no label, right-aligned send button
  // -------------------------------------------------------------------------
  return (
    <div className="relative w-full">
      <input
        type="text"
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
      <button
        type="button"
        onClick={onSend}
        aria-label="Send message"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "inline-flex items-center justify-center",
          "size-7 rounded-lg",
          "bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]",
          "hover:bg-[oklch(0.92_0_0)]",
          "active:bg-[oklch(0.86_0_0)]",
          "transition-colors duration-150",
          "disabled:pointer-events-none disabled:opacity-40",
          "cursor-pointer"
        )}
      >
        <Send aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  )
}

export { Input, inputVariants }
