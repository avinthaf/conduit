
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Conduit AI — KnowledgeGapCard component
 *
 * Surfaced on the post-session review screen to highlight areas where the
 * trainee's knowledge was insufficient, with a link to the relevant article.
 */

interface KnowledgeGapCardProps {
  tag: string
  title: string
  articleId: string
  href?: string
  className?: string
}

function KnowledgeGapCard({
  tag,
  title,
  articleId,
  href,
  className,
}: KnowledgeGapCardProps) {
  return (
    <div
      data-slot="knowledge-gap-card"
      className={cn(
        "flex flex-col gap-2",
        "bg-[#111111] border border-[#27272a] rounded-[4px]",
        "p-3",
        className
      )}
    >
      {/* Tag badge */}
      <Badge variant="toolCallBlue">{tag}</Badge>

      {/* Title */}
      <p className="font-mono text-[13px] font-normal text-[oklch(0.985_0_0)] leading-snug">
        {title}
      </p>

      {/* Article ID + optional external link */}
      <div className="flex items-center gap-1">
        <ExternalLink
          aria-hidden="true"
          className="size-3 text-[#52525b] shrink-0"
        />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-mono text-[11px] text-[#52525b]",
              "hover:text-[#a1a1aa] transition-colors duration-150",
              "truncate"
            )}
          >
            {articleId}
          </a>
        ) : (
          <span className="font-mono text-[11px] text-[#52525b] truncate">
            {articleId}
          </span>
        )}
      </div>
    </div>
  )
}

export { KnowledgeGapCard }
export type { KnowledgeGapCardProps }
