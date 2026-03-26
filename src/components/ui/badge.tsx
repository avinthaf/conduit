import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — Badge component
 *
 * Variants:
 *   completed     — zinc-800 bg, zinc-400 text, pill shape
 *   live          — green text, black bg, pill, animated pulsing dot prefix
 *   grade         — white text, zinc-800 bg, pill
 *   toolCallBlue  — blue text, blue/10 bg, pill, 11px
 *   toolCallAmber — amber text, amber/10 bg, pill, 11px
 *   difficulty    — zinc-400 text, zinc-800 bg, pill
 */

const badgeVariants = cva(
  // base — shared across all variants
  [
    "inline-flex shrink-0 items-center gap-1.5",
    "font-mono font-medium leading-none",
    "rounded-[100px]",
    "select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        completed: [
          "bg-[#27272a] text-[#a1a1aa]",
          "text-[12px] px-2.5 py-1",
        ].join(" "),

        live: [
          "bg-black text-[#22c55e]",
          "text-[12px] px-2.5 py-1",
          "border border-[#22c55e]/20",
        ].join(" "),

        grade: [
          "bg-[#27272a] text-[oklch(0.985_0_0)]",
          "text-[12px] px-2.5 py-1",
        ].join(" "),

        toolCallBlue: [
          "bg-[#3b82f6]/10 text-[#3b82f6]",
          "text-[11px] px-2 py-0.5",
        ].join(" "),

        toolCallAmber: [
          "bg-[#f59e0b]/10 text-[#f59e0b]",
          "text-[11px] px-2 py-0.5",
        ].join(" "),

        difficulty: [
          "bg-[#27272a] text-[#a1a1aa]",
          "text-[12px] px-2.5 py-1",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "completed",
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
}

function Badge({ className, variant = "completed", children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {variant === "live" && (
        <span
          aria-hidden="true"
          className="relative flex size-1.5 shrink-0"
        >
          {/* Ping animation */}
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
          {/* Solid dot */}
          <span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
        </span>
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
