import * as React from "react"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Conduit AI — ToolCallCard component
 *
 * Inline card displayed when the AI assistant invokes a tool during a session.
 * Supports three tool types:
 *   kb         — knowledge base lookup  → blue badge
 *   sop        — standard operating procedure → amber badge
 *   escalation — escalation pathway     → amber badge
 */

interface ToolCallCardProps {
  type: "kb" | "sop" | "escalation"
  title: string
  body: string
  source?: string
  className?: string
}

const TYPE_LABELS: Record<ToolCallCardProps["type"], string> = {
  kb: "Knowledge Base",
  sop: "SOP",
  escalation: "Escalation",
}

function ToolCallCard({
  type,
  title,
  body,
  source,
  className,
}: ToolCallCardProps) {
  const badgeVariant = type === "kb" ? "toolCallBlue" : "toolCallAmber"

  return (
    <div
      data-slot="tool-call-card"
      data-type={type}
      className={cn(
        "flex flex-col gap-2",
        "bg-[#111111] border border-[#27272a] rounded-[4px]",
        "p-3",
        className
      )}
    >
      {/* Badge */}
      <Badge variant={badgeVariant}>{TYPE_LABELS[type]}</Badge>

      {/* Title */}
      <p className="font-mono text-[13px] font-medium text-[oklch(0.985_0_0)] leading-snug">
        {title}
      </p>

      {/* Body */}
      <p className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-relaxed">
        {body}
      </p>

      {/* Optional source link */}
      {source && (
        <div className="flex items-center gap-1 pt-0.5">
          <ExternalLink
            aria-hidden="true"
            className="size-3 text-[#52525b] shrink-0"
          />
          <span className="font-mono text-[11px] text-[#52525b] truncate">
            {source}
          </span>
        </div>
      )}
    </div>
  )
}

export { ToolCallCard }
export type { ToolCallCardProps }
