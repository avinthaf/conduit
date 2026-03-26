import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Conduit AI — TranscriptRow component
 *
 * Renders a single conversation turn inside a session transcript.
 * - Blue dot  for customer turns
 * - Green dot for trainee turns
 *
 * The parent container is responsible for horizontal padding; this component
 * only adds 12px of vertical breathing room.
 */

interface TranscriptRowProps {
  speaker: "customer" | "trainee"
  name: string
  timestamp: string
  message: string
  className?: string
}

function TranscriptRow({
  speaker,
  name,
  timestamp,
  message,
  className,
}: TranscriptRowProps) {
  const isCustomer = speaker === "customer"

  return (
    <div
      data-slot="transcript-row"
      data-speaker={speaker}
      className={cn("py-3 flex flex-col gap-1.5", className)}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header row — dot + name + timestamp                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-2">
        {/* Speaker indicator dot */}
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full shrink-0",
            isCustomer ? "bg-[#3b82f6]" : "bg-[#22c55e]"
          )}
        />

        {/* Name */}
        <span className="font-mono text-[13px] font-semibold text-[oklch(0.985_0_0)] leading-none">
          {name}
        </span>

        {/* Timestamp */}
        <span className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-none">
          {timestamp}
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Message body                                                         */}
      {/* ------------------------------------------------------------------ */}
      <p
        className={cn(
          "font-mono text-[13px] font-normal leading-relaxed",
          "text-[oklch(0.985_0_0)]",
          // Indent to align with name text (dot 6px + gap 8px = 14px)
          "pl-[14px]"
        )}
      >
        {message}
      </p>
    </div>
  )
}

export { TranscriptRow }
export type { TranscriptRowProps }
