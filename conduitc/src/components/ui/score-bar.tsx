

import { cn } from "@/lib/utils"

/**
 * Conduit AI — ScoreBar component
 *
 * A labeled progress bar used to visualise skill scores on the post-session
 * review screen. The track is always zinc-800; the fill is green (default) or
 * amber depending on the variant prop.
 */

interface ScoreBarProps {
  label: string
  /** Score value between 0 and 100 */
  score: number
  variant?: "green" | "amber"
  className?: string
}

function ScoreBar({
  label,
  score,
  variant = "green",
  className,
}: ScoreBarProps) {
  const clampedScore = Math.min(100, Math.max(0, score))

  return (
    <div
      data-slot="score-bar"
      className={cn("flex flex-col gap-1.5 w-full", className)}
    >
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-none">
          {label}
        </span>
        <span
          className="font-mono text-[12px] font-medium text-[oklch(0.985_0_0)] leading-none tabular-nums"
          aria-label={`${clampedScore} percent`}
        >
          {clampedScore}%
        </span>
      </div>

      {/* Track */}
      <div
        className="w-full h-[4px] rounded-full bg-[#27272a] overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            variant === "amber" ? "bg-[#f59e0b]" : "bg-[#22c55e]"
          )}
          style={{ width: `${clampedScore}%` }}
        />
      </div>
    </div>
  )
}

export { ScoreBar }
export type { ScoreBarProps }
