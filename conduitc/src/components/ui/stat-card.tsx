

import { cn } from "@/lib/utils"

/**
 * Conduit AI — StatCard component
 *
 * Displays a single metric with a large value and a muted label below.
 * Optional suffix is rendered inline with the value in zinc-400.
 *
 * Intentionally unstyled at the container level so it can be composed inside
 * any grid, card, or panel the parent chooses.
 */

interface StatCardProps {
  label: string
  value: string
  suffix?: string
  className?: string
}

function StatCard({ label, value, suffix, className }: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn("flex flex-col gap-1", className)}
    >
      {/* Value row */}
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-[24px] font-semibold text-[oklch(0.985_0_0)] leading-none tabular-nums">
          {value}
        </span>
        {suffix && (
          <span className="font-mono text-[14px] font-normal text-[#a1a1aa] leading-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-none">
        {label}
      </span>
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
