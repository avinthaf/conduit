import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { PhoneOff } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — Button component
 *
 * All variants are built on top of cva so the base focus / disabled / aria
 * states are inherited by every variant. Project-specific tokens live inline
 * rather than in CSS variables so the component is self-contained and works
 * regardless of the host page's theme state.
 *
 * Variants:
 *   primary     — white fill, dark text  (default CTA)
 *   secondary   — zinc-900 fill, zinc-800 border
 *   destructive — red-500 fill, white text
 *   endCall     — red-500 pill (100px radius) with PhoneOff icon
 *   ghost       — no fill/border, hover shows zinc-900 surface
 *   navActive   — transparent, white text 500w, white bottom-border indicator
 *   navInactive — transparent, zinc-500 text 400w, hover lifts to white
 */

// ---------------------------------------------------------------------------
// Shared base — resets the shadcn-generated defaults that would fight with our
// design tokens (rounded-lg, bg-primary, etc.) while keeping structural /
// accessibility utilities.
// ---------------------------------------------------------------------------
const base = [
  // layout
  "inline-flex shrink-0 items-center justify-center gap-2",
  // typography
  "font-mono text-[13px] font-medium leading-none whitespace-nowrap",
  // interaction
  "cursor-pointer select-none transition-colors duration-150",
  // focus ring — kept accessible but matches dark theme
  "outline-none",
  "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
  // disabled
  "disabled:pointer-events-none disabled:opacity-40",
  // icons inside (lucide)
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
].join(" ")

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /**
       * Primary — white background, dark text.
       * Main affirmative action (e.g. "Save", "Start session").
       */
      primary: [
        "bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]",
        "rounded-[4px]",
        "hover:bg-[oklch(0.92_0_0)]",
        "active:bg-[oklch(0.86_0_0)]",
      ].join(" "),

      /**
       * Secondary — dark fill with zinc-800 border.
       * Supporting actions that sit alongside a primary button.
       */
      secondary: [
        "bg-[#18181b] text-[oklch(0.985_0_0)]",
        "border border-[#27272a]",
        "rounded-[4px]",
        "hover:bg-[#27272a]",
        "active:bg-[#3f3f46]",
      ].join(" "),

      /**
       * Destructive — red-500 fill.
       * Irreversible / dangerous actions (e.g. "Delete scenario").
       */
      destructive: [
        "bg-[#ef4444] text-white",
        "rounded-[4px]",
        "hover:bg-[#dc2626]",
        "active:bg-[#b91c1c]",
      ].join(" "),

      /**
       * EndCall — red pill with PhoneOff icon.
       * Always renders its own icon; children are optional label text.
       * The pill radius overrides the base rounding.
       */
      endCall: [
        "bg-[#ef4444] text-white",
        "rounded-[100px]",
        "hover:bg-[#dc2626]",
        "active:bg-[#b91c1c]",
      ].join(" "),

      /**
       * Ghost — no background or border. Reveals a subtle surface on hover.
       * Used for icon buttons, toolbar actions, and secondary list controls.
       */
      ghost: [
        "bg-transparent text-[oklch(0.985_0_0)]",
        "rounded-[4px]",
        "hover:bg-[#18181b]",
        "active:bg-[#27272a]",
      ].join(" "),

      /**
       * NavActive — current/active navigation item.
       * White text, 500 weight, 2px white bottom-border indicator.
       * The negative margin-bottom on the indicator aligns it flush with
       * a typical tab-bar underline.
       */
      navActive: [
        "bg-transparent text-[oklch(0.985_0_0)] font-medium",
        "rounded-none",
        "border-b-2 border-b-[oklch(0.985_0_0)]",
        // no hover — already active
      ].join(" "),

      /**
       * NavInactive — idle navigation item.
       * Zinc-500 text, normal weight. Hover transitions text to near-white.
       */
      navInactive: [
        "bg-transparent text-[#71717a] font-normal",
        "rounded-none",
        "hover:text-[oklch(0.985_0_0)]",
        "transition-colors duration-150",
      ].join(" "),
    },

    size: {
      /**
       * Default — 8px vertical / 16px horizontal padding (from spec).
       * This intentionally overrides shadcn's h-8 fixed-height approach so
       * the button grows with multi-line content if needed.
       */
      default: "px-4 py-2",

      /**
       * sm — compact variant for dense UIs (e.g. inline toolbar buttons).
       */
      sm: "px-3 py-1.5 text-[12px]",

      /**
       * lg — larger tap target, used for prominent full-width CTAs.
       */
      lg: "px-6 py-3 text-[14px]",

      /**
       * icon — square icon-only button; no padding, fixed size.
       */
      icon: "size-8 p-0",

      /**
       * nav — tighter padding for nav bars; no extra horizontal breathing room.
       */
      nav: "px-3 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

// ---------------------------------------------------------------------------
// EndCall button — always includes the PhoneOff icon. The icon is prepended
// before children so a label like "End Call" sits naturally to its right.
// ---------------------------------------------------------------------------
type ButtonBaseProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonBaseProps) {
  const Comp = asChild ? Slot.Root : "button"

  const isEndCall = variant === "endCall"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isEndCall && (
        <PhoneOff
          aria-hidden="true"
          className="size-4 shrink-0"
        />
      )}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
