
import {
  Bot,
  CheckCircle,
  Library,
  RadioIcon,
  RotateCcw,
  ScrollText,
  TriangleAlert,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScoreBar } from "@/components/ui/score-bar"
import { TranscriptRow } from "@/components/ui/transcript-row"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TranscriptEntry {
  id: string
  speaker: "customer" | "trainee"
  name: string
  timestamp: string
  message: string
  flagged?: boolean
  flagNote?: string
}

interface ImprovementItem {
  id: string
  label: string
  timestamp: string
  detail: string
}

interface KnowledgeGapItem {
  id: string
  tag: string
  tagVariant: "kb" | "sop"
  title: string
  body: string
  articleId: string
}

interface ScoreBreakdownItem {
  id: string
  label: string
  score: number
  variant: "green" | "amber"
}

// ---------------------------------------------------------------------------
// Placeholder data — mirrors the design exactly
// ---------------------------------------------------------------------------

const TRANSCRIPT: TranscriptEntry[] = [
  {
    id: "t1",
    speaker: "customer",
    name: "Maya Chen",
    timestamp: "0:00",
    message:
      "I've been waiting three weeks for my refund and nobody has given me a straight answer.",
  },
  {
    id: "t2",
    speaker: "trainee",
    name: "Jordan Davis",
    timestamp: "0:14",
    message:
      "I completely understand your frustration, Ms. Chen. Let me pull up your account right now.",
  },
  {
    id: "t3",
    speaker: "trainee",
    name: "Jordan Davis",
    timestamp: "2:18",
    message: "I'll try to get this resolved for you today, I think we can do that.",
    flagged: true,
    flagNote: 'Flagged: avoid "I\'ll try" — use definitive language',
  },
  {
    id: "t4",
    speaker: "customer",
    name: "Maya Chen",
    timestamp: "2:41",
    message: "Fine, so what exactly is going to happen with my refund?",
  },
  {
    id: "t5",
    speaker: "trainee",
    name: "Jordan Davis",
    timestamp: "2:55",
    message:
      "Your refund has been expedited and you will receive a 10% courtesy credit within 3-5 business days. I'm escalating this to our billing supervisor now.",
  },
]

const STRENGTHS: string[] = [
  "Strong opening — immediate empathy acknowledgement",
  "Correctly referenced SOP and offered 10% credit",
  "Escalation to supervisor executed correctly at 2:55",
]

const IMPROVEMENTS: ImprovementItem[] = [
  {
    id: "i1",
    label: "Hedging language at 2:18",
    timestamp: "2:18",
    detail:
      'Said "I\'ll try" instead of committing. Use "I will" or "I\'m doing X now".',
  },
  {
    id: "i2",
    label: "Response latency at 1:40",
    timestamp: "1:40",
    detail:
      "8s pause before responding. Use filler phrases to signal active listening while retrieving info.",
  },
]

const SCORE_BREAKDOWN: ScoreBreakdownItem[] = [
  { id: "sb1", label: "Empathy", score: 90, variant: "green" },
  { id: "sb2", label: "Policy Knowledge", score: 95, variant: "green" },
  { id: "sb3", label: "Communication", score: 82, variant: "amber" },
  { id: "sb4", label: "Escalation", score: 100, variant: "green" },
]

const KNOWLEDGE_GAPS: KnowledgeGapItem[] = [
  {
    id: "kg1",
    tag: "KB",
    tagVariant: "kb",
    title: "Refund & Return Policy",
    body: "You missed the expedited refund offer window. Review the 14-day delay trigger and credit offer process.",
    articleId: "KB-2041",
  },
  {
    id: "kg2",
    tag: "SOP",
    tagVariant: "sop",
    title: "Billing Escalation Procedure",
    body: "Escalation timing was slightly late. Review the 3-contact rule and supervisor transfer steps.",
    articleId: "SOP-0118",
  },
  {
    id: "kg3",
    tag: "KB",
    tagVariant: "kb",
    title: "Communication Best Practices",
    body: "Practice avoiding hedging language. Use confident, action-oriented phrases to build customer trust.",
    articleId: "KB-1088",
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// ---- Navbar ----------------------------------------------------------------

function NavBar() {
  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-10",
        "flex items-center gap-0 h-12 px-8",
        "bg-[#0a0a0a] border-b border-[#27272a]",
      )}
      aria-label="Top navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <RadioIcon aria-hidden="true" className="size-4 text-[oklch(0.985_0_0)] shrink-0" />
        <span className="font-mono text-[14px] font-semibold text-[oklch(0.985_0_0)]">
          Conduit
        </span>
      </div>

      {/* Divider */}
      <div aria-hidden="true" className="w-px h-5 bg-[#27272a] mx-3" />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 px-3">
        <span className="font-mono text-[12px] text-[#52525b]">Dashboard</span>
        <span aria-hidden="true" className="font-mono text-[12px] text-[#27272a]">/</span>
        <span className="font-mono text-[12px] text-[#52525b]">Sessions</span>
        <span aria-hidden="true" className="font-mono text-[12px] text-[#27272a]">/</span>
        <span className="font-mono text-[12px] text-[#a1a1aa]">Review #24</span>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm">
          <RotateCcw aria-hidden="true" className="size-3 text-[#a1a1aa]" />
          <span className="text-[#a1a1aa]">Try Again</span>
        </Button>
        <Button variant="primary" size="sm">
          Next Scenario →
        </Button>
      </div>
    </header>
  )
}

// ---- Hero ------------------------------------------------------------------

function HeroBanner() {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-12 z-10",
        "flex items-center gap-8 h-[120px] px-16",
        "bg-[#0a0a0a] border-b border-[#27272a]",
      )}
      aria-label="Session summary"
    >
      {/* Score badge */}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-0.5",
          "w-[88px] h-[88px] shrink-0",
          "bg-[#111111] border border-[#27272a] rounded-lg",
        )}
        aria-label="Score 92 out of 100"
      >
        <span className="font-mono text-[32px] font-bold text-[#22c55e] leading-none tabular-nums">
          92
        </span>
        <span className="font-mono text-[11px] text-[#52525b] leading-none">
          / 100
        </span>
      </div>

      {/* Hero info */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <h1 className="font-mono text-[20px] font-semibold text-[oklch(0.985_0_0)] leading-tight">
          Billing Dispute — Tier 2 Escalation
        </h1>

        {/* Meta row */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] text-[#52525b]">Mar 26, 2026</span>
          <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-[#3f3f46] shrink-0" />
          <span className="font-mono text-[12px] text-[#52525b]">Duration: 12:34</span>
          <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-[#3f3f46] shrink-0" />
          <span className="font-mono text-[12px] text-[#52525b]">Jordan Davis</span>

          {/* Grade badge */}
          <span
            className="font-mono text-[11px] text-[#86efac] bg-[#14532d] rounded-full px-2 py-0.5 leading-none"
            aria-label="Grade A"
          >
            Grade: A
          </span>
        </div>
      </div>
    </div>
  )
}

// ---- Transcript Replay column ----------------------------------------------

function TranscriptReplayColumn() {
  return (
    <section
      aria-label="Transcript Replay"
      className="flex flex-col w-[460px] shrink-0 h-full border-r border-[#27272a]"
    >
      {/* Column header */}
      <div className="flex items-center gap-2 h-11 px-5 border-b border-[#27272a] shrink-0">
        <ScrollText aria-hidden="true" className="size-[13px] text-[#52525b] shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-[#a1a1aa]">
          Transcript Replay
        </span>
        <div className="flex-1" />
        <span className="font-mono text-[11px] text-[#3f3f46]">12:34 total</span>
      </div>

      {/* Scrollable feed */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-0 flex flex-col gap-0">
        {TRANSCRIPT.map((entry) => {
          if (entry.flagged) {
            return (
              <FlaggedTranscriptEntry key={entry.id} entry={entry} />
            )
          }
          return (
            <TranscriptRow
              key={entry.id}
              speaker={entry.speaker}
              name={entry.name}
              timestamp={entry.timestamp}
              message={entry.message}
            />
          )
        })}
      </div>
    </section>
  )
}

// Flagged message with amber bubble
interface FlaggedTranscriptEntryProps {
  entry: TranscriptEntry
}

function FlaggedTranscriptEntry({ entry }: FlaggedTranscriptEntryProps) {
  return (
    <div className="pb-3 flex flex-col gap-1">
      {/* Speaker label */}
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-[#22c55e] shrink-0"
        />
        <span className="font-mono text-[10px] font-semibold text-[#22c55e] leading-none">
          {entry.name}
        </span>
        <span className="font-mono text-[10px] text-[#3f3f46] leading-none">
          {entry.timestamp}
        </span>
      </div>

      {/* Flagged bubble */}
      <div
        className={cn(
          "flex flex-col gap-1.5 rounded-lg p-2.5",
          "bg-[#1c1400] border border-[#78350f]",
        )}
        role="alert"
        aria-label="Flagged moment"
      >
        <p className="font-mono text-[12px] font-normal text-[oklch(0.985_0_0)] leading-relaxed">
          {entry.message}
        </p>
        {entry.flagNote && (
          <div className="flex items-center gap-1.5">
            <TriangleAlert
              aria-hidden="true"
              className="size-[11px] text-[#f59e0b] shrink-0"
            />
            <span className="font-mono text-[10px] text-[#f59e0b]">
              {entry.flagNote}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ---- AI Feedback column ----------------------------------------------------

function AIFeedbackColumn() {
  return (
    <section
      aria-label="AI Coach Feedback"
      className="flex flex-col flex-1 min-w-0 h-full border-r border-[#27272a]"
    >
      {/* Column header */}
      <div className="flex items-center gap-2 h-11 px-5 border-b border-[#27272a] shrink-0">
        <Bot aria-hidden="true" className="size-[13px] text-[#52525b] shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-[#a1a1aa]">
          AI Coach Feedback
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {/* Strengths card */}
        <StrengthsCard />

        {/* Areas to Improve card */}
        <ImprovementsCard />

        {/* Score Breakdown card */}
        <ScoreBreakdownCard />
      </div>
    </section>
  )
}

function StrengthsCard() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg p-3.5",
        "bg-[#0a1a0f] border border-[#166534]",
      )}
      aria-label="Strengths"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <CheckCircle aria-hidden="true" className="size-[13px] text-[#22c55e] shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-[#22c55e]">
          Strengths
        </span>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-1.5" aria-label="Strength points">
        {STRENGTHS.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-[5px] w-1 h-1 rounded-full bg-[#22c55e] shrink-0"
            />
            <span className="font-mono text-[12px] text-[#86efac] leading-relaxed">
              {s}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImprovementsCard() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg p-3.5",
        "bg-[#1c1400] border border-[#78350f]",
      )}
      aria-label="Areas to improve"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <TriangleAlert aria-hidden="true" className="size-[13px] text-[#f59e0b] shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-[#f59e0b]">
          Areas to Improve
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {IMPROVEMENTS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1 rounded-sm bg-[#27180a] px-2.5 py-2"
          >
            <span className="font-mono text-[11px] font-medium text-[#fde68a]">
              {item.label}
            </span>
            <p className="font-mono text-[11px] text-[#a1a1aa] leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreBreakdownCard() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-lg p-3.5",
        "bg-[#111111] border border-[#27272a]",
      )}
      aria-label="Score breakdown"
    >
      <span className="font-mono text-[9px] font-semibold tracking-[0.15em] text-[#3f3f46] uppercase">
        Score Breakdown
      </span>

      <div className="flex flex-col gap-2.5">
        {SCORE_BREAKDOWN.map((item) => (
          <ScoreBar
            key={item.id}
            label={item.label}
            score={item.score}
            variant={item.variant}
          />
        ))}
      </div>
    </div>
  )
}

// ---- Knowledge Gaps column -------------------------------------------------

function KnowledgeGapsColumn() {
  return (
    <section
      aria-label="Knowledge Gaps"
      className="flex flex-col w-[320px] shrink-0 h-full"
    >
      {/* Column header */}
      <div className="flex items-center gap-2 h-11 px-5 border-b border-[#27272a] shrink-0">
        <Library aria-hidden="true" className="size-[13px] text-[#52525b] shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-[#a1a1aa]">
          Knowledge Gaps
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {/* Intro */}
        <p className="font-mono text-[12px] text-[#52525b] leading-relaxed">
          Based on this session, review these resources before your next attempt:
        </p>

        {/* Gap cards */}
        {KNOWLEDGE_GAPS.map((gap) => (
          <KnowledgeGapEntryCard key={gap.id} gap={gap} />
        ))}

        {/* Recommended next scenario */}
        <NextScenarioCard />
      </div>
    </section>
  )
}

function KnowledgeGapEntryCard({ gap }: { gap: KnowledgeGapItem }) {
  const isKb = gap.tagVariant === "kb"

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-lg p-3",
        "bg-[#111111] border border-[#27272a]",
      )}
    >
      {/* Top: badge + title */}
      <div className="flex items-center gap-2">
        {/* Inline badge matching design — KB=blue, SOP=amber */}
        <span
          className={cn(
            "font-mono text-[9px] font-medium rounded-sm px-1.5 py-0.5 leading-none shrink-0",
            isKb
              ? "bg-[#172554] text-[#93c5fd]"
              : "bg-[#2d1b00] text-[#fbbf24]",
          )}
        >
          {gap.tag}
        </span>
        <span className="font-mono text-[12px] text-[#a1a1aa] leading-snug">
          {gap.title}
        </span>
      </div>

      {/* Body */}
      <p className="font-mono text-[11px] text-[#71717a] leading-relaxed">
        {gap.body}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[10px] text-[#3b82f6]">{gap.articleId}</span>
        <span className="font-mono text-[10px] text-[#52525b]">→ Open article</span>
      </div>
    </div>
  )
}

function NextScenarioCard() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-lg p-3",
        "bg-[#111111] border border-[#27272a]",
      )}
      aria-label="Recommended next scenario"
    >
      <span className="font-mono text-[9px] font-semibold tracking-[0.15em] text-[#3f3f46] uppercase">
        Recommended Next
      </span>
      <span className="font-mono text-[13px] font-semibold text-[oklch(0.985_0_0)]">
        Product Return — Defective Item
      </span>
      <p className="font-mono text-[11px] text-[#71717a] leading-relaxed">
        Build on your policy knowledge with a defect-based return scenario.
        Intermediate difficulty.
      </p>
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-center",
          "font-mono text-[12px] font-semibold text-[#0a0a0a]",
          "bg-[oklch(0.985_0_0)] rounded-lg px-4 py-2",
          "hover:bg-[oklch(0.92_0_0)] active:bg-[oklch(0.86_0_0)]",
          "transition-colors duration-150 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        )}
      >
        Start Next Scenario →
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PostSessionReview() {
  return (
    <div
      className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden font-mono"
      aria-label="Post-Session Review"
    >
      {/* Fixed top bars */}
      <NavBar />
      <HeroBanner />

      {/* Three-column content area — sits below navbar (48px) + hero (120px) */}
      <div
        className="absolute inset-x-0 top-[168px] bottom-0 flex overflow-hidden"
        role="main"
      >
        <TranscriptReplayColumn />
        <AIFeedbackColumn />
        <KnowledgeGapsColumn />
      </div>
    </div>
  )
}
