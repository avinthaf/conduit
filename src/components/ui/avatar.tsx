import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — Avatar component
 *
 * Renders a circular avatar with either:
 *   - An image (when `src` is provided), or
 *   - Generated initials on a zinc-800 background
 *
 * Sizes:
 *   sm  → 24px
 *   md  → 32px  (default)
 *   lg  → 48px
 */

interface AvatarProps {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "size-6 text-[9px]",
  md: "size-8 text-[11px]",
  lg: "size-12 text-[15px]",
}

/** Derive up to 2 initials from a display name (e.g. "Jane Doe" → "JD") */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
}

function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = getInitials(name)
  const sizeClass = sizeClasses[size]

  return (
    <span
      data-slot="avatar"
      data-size={size}
      aria-label={name}
      role="img"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "rounded-full overflow-hidden",
        "select-none",
        sizeClass,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          draggable={false}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center size-full",
            "bg-[#27272a]",
            "font-mono font-medium text-[oklch(0.985_0_0)] leading-none"
          )}
        >
          {initials}
        </span>
      )}
    </span>
  )
}

export { Avatar }
export type { AvatarProps }
