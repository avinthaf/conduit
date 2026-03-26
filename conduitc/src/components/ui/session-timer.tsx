import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — SessionTimer component
 *
 * Pure display component — no internal clock logic.
 * Formats a raw `seconds` value as MM:SS and renders it in IBM Plex Mono.
 * An optional muted label is rendered above the time value.
 */

interface SessionTimerProps {
  /** Total elapsed (or remaining) time in seconds */
  seconds: number
  /** Optional descriptor shown above the time value */
  label?: string
  className?: string
}

/** Format an integer number of seconds to "MM:SS" */
function formatTime(seconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(seconds))
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function SessionTimer({ seconds, label, className }: SessionTimerProps) {
  return (
    <div
      data-slot="session-timer"
      className={cn("flex flex-col items-center gap-0.5", className)}
    >
      {label && (
        <span className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-none">
          {label}
        </span>
      )}
      <time
        dateTime={`PT${Math.floor(seconds / 60)}M${seconds % 60}S`}
        className="font-mono text-[oklch(0.985_0_0)] leading-none tabular-nums"
      >
        {formatTime(seconds)}
      </time>
    </div>
  )
}

export { SessionTimer, formatTime }
export type { SessionTimerProps }
