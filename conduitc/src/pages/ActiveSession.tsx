import * as React from "react"
import {
  Radio,
  MicOff,
  Pause,
  PhoneOff,
  Bot,
  MessageCircle,
  Send,
  BookOpen,
  BarChart2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SessionTimer } from "@/components/ui/session-timer"
import { TranscriptRow } from "@/components/ui/transcript-row"
import { ToolCallCard } from "@/components/ui/tool-call-card"
import { Waveform } from "@/components/ui/waveform"

// ---------------------------------------------------------------------------
// Static placeholder data — matches the design spec exactly
// ---------------------------------------------------------------------------

const TRANSCRIPT_TURNS = [
  {
    id: "t1",
    speaker: "customer" as const,
    name: "Maya Chen",
    timestamp: "12:21",
    message:
      "I've been waiting three weeks for my refund and nobody has given me a straight answer. This is completely unacceptable.",
  },
  {
    id: "t2",
    speaker: "trainee" as const,
    name: "You (Jordan)",
    timestamp: "12:22",
    message:
      "I completely understand your frustration, Ms. Chen. Let me pull up your account and look at the refund status right now.",
  },
  {
    id: "t3",
    speaker: "customer" as const,
    name: "Maya Chen",
    timestamp: "12:23",
    message:
      "The order number is 8841-BXQP. I paid $349 and I want my money back today.",
  },
  {
    id: "t4",
    speaker: "trainee" as const,
    name: "You (Jordan)",
    timestamp: "12:24",
    message:
      "I can see order 8841-BXQP. The refund was initiated on the 18th but may be delayed. Let me check the policy on expedited processing...",
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Top navigation bar */
function NavBar() {
  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 h-12 z-10",
        "flex items-center gap-0 px-8",
        "bg-[#0a0a0a]",
        "border-b border-[#27272a]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <Radio aria-hidden="true" className="size-4 text-[oklch(0.985_0_0)]" />
        <span className="font-mono text-sm font-semibold text-[oklch(0.985_0_0)]">
          Conduit
        </span>
      </div>

      {/* Divider */}
      <div className="mx-4 w-px h-5 bg-[#27272a] shrink-0" aria-hidden="true" />

      {/* Active scenario chip */}
      <div className="flex items-center gap-2 px-3 shrink-0">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-[#ef4444] shrink-0"
        />
        <span className="font-mono text-xs text-[#a1a1aa]">
          Billing Dispute — Tier 2 Escalation
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Session timer */}
      <SessionTimer seconds={754} className="mr-4" />
      <span className="font-mono text-[11px] text-[#52525b] mr-6">elapsed</span>

      {/* Trainee identity */}
      <div className="flex items-center gap-1.5 mr-2">
        <Avatar name="Jordan Davis" size="sm" />
        <span className="font-mono text-xs text-[#71717a]">Jordan Davis</span>
      </div>

      <div className="w-2 shrink-0" />

      {/* End session */}
      <button
        type="button"
        aria-label="End session"
        className={cn(
          "inline-flex items-center gap-1.5 shrink-0",
          "px-3.5 py-2",
          "bg-[#450a0a] text-[#fca5a5]",
          "border border-[#991b1b] rounded-lg",
          "font-mono text-xs font-medium",
          "hover:bg-[#5a1010] transition-colors duration-150",
          "cursor-pointer"
        )}
      >
        <PhoneOff aria-hidden="true" className="size-3.5 shrink-0" />
        End Session
      </button>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Call Panel (left column, 380px)
// ---------------------------------------------------------------------------

function CallPanel() {
  return (
    <aside
      aria-label="Call panel"
      className={cn(
        "flex flex-col w-[380px] shrink-0",
        "border-r border-[#27272a]",
        "bg-[#0a0a0a]",
        "overflow-hidden"
      )}
    >
      {/* ---- Call header ---- */}
      <div
        className={cn(
          "flex flex-col gap-0 p-6",
          "border-b border-[#27272a]"
        )}
      >
        {/* Avatar + name block */}
        <div className="flex items-center gap-4 pb-4 w-full">
          {/* Custom avatar with blue tint matching the design */}
          <span
            aria-label="Maya Chen"
            role="img"
            className={cn(
              "inline-flex shrink-0 items-center justify-center",
              "size-12 rounded-full",
              "bg-[#1e3a5f] select-none"
            )}
          >
            <span className="font-mono text-base font-semibold text-[#93c5fd]">
              MC
            </span>
          </span>

          {/* Name + label */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm font-semibold text-[oklch(0.985_0_0)]">
              Maya Chen
            </span>
            <span className="font-mono text-[11px] text-[#71717a]">
              Billing Dispute · Tier 2
            </span>
          </div>

          {/* LIVE chip */}
          <div
            className={cn(
              "inline-flex items-center gap-1.5",
              "bg-[#172554] rounded-full px-2.5 py-1",
              "ml-auto shrink-0"
            )}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#3b82f6] shrink-0"
            />
            <span className="font-mono text-[10px] font-semibold text-[#93c5fd] tracking-wider">
              LIVE
            </span>
          </div>
        </div>

        {/* Waveform */}
        <Waveform active={true} className="w-full" />

        {/* VoIP controls */}
        <div className="flex items-center justify-center gap-2 pt-4 w-full">
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-1.5",
              "flex-1 py-2 px-4",
              "bg-[#18181b] border border-[#3f3f46] rounded-lg",
              "font-mono text-xs text-[#a1a1aa]",
              "hover:bg-[#27272a] transition-colors duration-150 cursor-pointer"
            )}
          >
            <MicOff aria-hidden="true" className="size-3.5 shrink-0" />
            Mute
          </button>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-1.5",
              "flex-1 py-2 px-4",
              "bg-[#18181b] border border-[#3f3f46] rounded-lg",
              "font-mono text-xs text-[#a1a1aa]",
              "hover:bg-[#27272a] transition-colors duration-150 cursor-pointer"
            )}
          >
            <Pause aria-hidden="true" className="size-3.5 shrink-0" />
            Hold
          </button>

          <Button
            variant="endCall"
            size="sm"
            className="flex-none px-5"
            aria-label="End call"
          >
            End Call
          </Button>
        </div>
      </div>

      {/* ---- Live transcript ---- */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Transcript header */}
        <div
          className={cn(
            "flex items-center h-9 px-4 shrink-0",
            "border-b border-[#18181b]"
          )}
        >
          <span className="font-mono text-[11px] font-semibold text-[#52525b] tracking-wider uppercase">
            Live Transcript
          </span>
          <div className="flex-1" />
        </div>

        {/* Scrollable transcript feed */}
        <div
          className="flex-1 overflow-y-auto px-4 divide-y divide-[#18181b]"
          aria-label="Transcript feed"
          aria-live="polite"
        >
          {TRANSCRIPT_TURNS.map((turn) => (
            <TranscriptRow
              key={turn.id}
              speaker={turn.speaker}
              name={turn.name}
              timestamp={turn.timestamp}
              message={turn.message}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// AI Coach Panel (center column, fills remaining space)
// ---------------------------------------------------------------------------

function AICoachPanel() {
  const [coachInput, setCoachInput] = React.useState("")

  function handleSend() {
    if (!coachInput.trim()) return
    setCoachInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section
      aria-label="AI Coach"
      className={cn(
        "flex flex-col flex-1",
        "border-r border-[#27272a]",
        "bg-[#0a0a0a]",
        "min-w-0 overflow-hidden"
      )}
    >
      {/* AI header */}
      <div
        className={cn(
          "flex items-center gap-2.5 h-12 px-5 shrink-0",
          "border-b border-[#27272a]"
        )}
      >
        <Bot aria-hidden="true" className="size-[15px] text-[#a1a1aa] shrink-0" />
        <span className="font-mono text-[13px] font-semibold text-[oklch(0.985_0_0)]">
          AI Coach
        </span>
        {/* Status dot */}
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-[#22c55e] shrink-0"
        />
        <span className="font-mono text-[11px] text-[#52525b]">
          listening...
        </span>
        <div className="flex-1" />
        <span className="font-mono text-[11px] text-[#52525b]">
          ↗ context
        </span>
      </div>

      {/* Scrollable feed */}
      <div
        className="flex-1 overflow-y-auto flex flex-col gap-3 p-5"
        aria-label="AI coach feed"
        aria-live="polite"
      >
        {/* AI message 1 */}
        <div className="flex flex-col gap-1.5 w-full">
          <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
            Customer is escalating around refund timeline. The key here is to
            acknowledge the delay without making promises you can&apos;t keep.
          </p>
        </div>

        {/* Tool call card — KB */}
        <ToolCallCard
          type="kb"
          title="Retrieved: Refund Policy SOP"
          body="Standard window: 30 days from purchase. Delayed refunds (>14 days after initiation): escalate to billing tier 2 and issue courtesy credit offer of 10%."
          source="KB-2041 · Refund & Return Policy"
        />

        {/* Tool call card — Escalation */}
        <ToolCallCard
          type="escalation"
          title="Escalation Path — Billing Tier 2"
          body="1. Verify refund delay > 14 days  →  2. Offer 10% credit + expedite  →  3. If unresolved, transfer to Billing Supervisor (ext. 3302)"
          source="SOP-0118 · Billing Escalation Procedure"
        />

        {/* AI message 2 */}
        <div className="flex flex-col gap-1.5 w-full">
          <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
            Good — you found the order. Now offer the 10% credit and confirm
            the expedited timeline. Avoid saying &quot;I&apos;ll try&quot;.
          </p>
        </div>

        {/* Tool call card — KB (product spec) */}
        <ToolCallCard
          type="kb"
          title="Product: ProX Wireless Headset"
          body="SKU: PRX-WH-BLK · $349 MSRP · 2yr warranty · Common issue: charging port failure (defect eligible for 90-day return)."
        />
      </div>

      {/* Input bar */}
      <div
        className={cn(
          "flex items-center gap-2.5 h-14 px-4 shrink-0",
          "border-t border-[#27272a]"
        )}
      >
        {/* Input wrapper */}
        <div
          className={cn(
            "relative flex items-center flex-1",
            "bg-[#111111] border border-[#3f3f46] rounded-lg",
            "h-9 px-3 gap-2"
          )}
        >
          <MessageCircle
            aria-hidden="true"
            className="size-3.5 text-[#52525b] shrink-0"
          />
          <input
            value={coachInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCoachInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI coach a question..."
            aria-label="Ask the AI coach"
            className={cn(
              "flex-1 h-full bg-transparent outline-none",
              "font-mono text-xs text-[oklch(0.985_0_0)]",
              "placeholder:text-[#3f3f46]"
            )}
          />
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send question"
          className={cn(
            "inline-flex items-center justify-center",
            "size-9 shrink-0",
            "bg-[#18181b] border border-[#3f3f46] rounded-lg",
            "text-[#71717a]",
            "hover:bg-[#27272a] hover:text-[oklch(0.985_0_0)]",
            "transition-colors duration-150 cursor-pointer"
          )}
        >
          <Send aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Context / Scenario Brief drawer (right column, 280px)
// ---------------------------------------------------------------------------

function ScenarioBriefPanel() {
  return (
    <aside
      aria-label="Scenario brief"
      className={cn(
        "flex flex-col w-[280px] shrink-0",
        "bg-[#0a0a0a]",
        "overflow-hidden"
      )}
    >
      {/* Panel header */}
      <div
        className={cn(
          "flex items-center gap-2 h-12 px-4 shrink-0",
          "border-b border-[#27272a]"
        )}
      >
        <BookOpen aria-hidden="true" className="size-3.5 text-[#52525b] shrink-0" />
        <span className="font-mono text-xs font-semibold text-[#a1a1aa]">
          Scenario Brief
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-4">
        {/* Scenario card */}
        <div
          className={cn(
            "flex flex-col gap-2.5 p-3",
            "bg-[#111111] border border-[#27272a] rounded-lg"
          )}
        >
          {/* Section label */}
          <span className="font-mono text-[9px] font-semibold text-[#3f3f46] tracking-[1.5px] uppercase">
            Scenario
          </span>
          <span className="font-mono text-[13px] font-semibold text-[oklch(0.985_0_0)]">
            Billing Dispute — Tier 2
          </span>

          {/* Divider */}
          <div className="w-full h-px bg-[#27272a]" aria-hidden="true" />

          {/* Customer profile label */}
          <span className="font-mono text-[9px] font-semibold text-[#3f3f46] tracking-[1.5px] uppercase">
            Customer Profile
          </span>

          {/* Profile rows */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-1.5 w-full">
              <span className="font-mono text-[11px] text-[#52525b] shrink-0">
                Name
              </span>
              <span className="font-mono text-[11px] text-[#a1a1aa] ml-auto text-right">
                Maya Chen
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 w-full">
              <span className="font-mono text-[11px] text-[#52525b] shrink-0">
                Tier
              </span>
              <span className="font-mono text-[11px] text-[#f59e0b] ml-auto text-right">
                Gold Member
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 w-full">
              <span className="font-mono text-[11px] text-[#52525b] shrink-0">
                Sentiment
              </span>
              <span className="font-mono text-[11px] text-[#ef4444] ml-auto text-right">
                Frustrated
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 w-full">
              <span className="font-mono text-[11px] text-[#52525b] shrink-0">
                History
              </span>
              <span className="font-mono text-[11px] text-[#a1a1aa] ml-auto text-right">
                3 prior contacts
              </span>
            </div>
          </div>
        </div>

        {/* Objectives card */}
        <div
          className={cn(
            "flex flex-col gap-2 p-3",
            "bg-[#111111] border border-[#27272a] rounded-lg"
          )}
        >
          <span className="font-mono text-[9px] font-semibold text-[#3f3f46] tracking-[1.5px] uppercase">
            Objectives
          </span>

          {[
            { num: "01", text: "Acknowledge delay with empathy" },
            { num: "02", text: "Offer courtesy credit per SOP" },
            { num: "03", text: "Avoid false promise on timeline" },
            { num: "04", text: "Escalate if unresolved after 3 attempts" },
          ].map(({ num, text }) => (
            <div key={num} className="flex items-start gap-2 w-full">
              <span className="font-mono text-[10px] text-[#3f3f46] shrink-0 mt-px">
                {num}
              </span>
              <span className="font-mono text-[11px] text-[#71717a] leading-snug">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Difficulty / estimated time badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5",
            "bg-[#27272a] rounded-lg",
            "w-full"
          )}
        >
          <BarChart2
            aria-hidden="true"
            className="size-3 text-[#f59e0b] shrink-0"
          />
          <span className="font-mono text-[11px] text-[#a1a1aa]">
            Difficulty: Intermediate
          </span>
          <div className="flex-1" />
          <span className="font-mono text-[10px] text-[#52525b]">
            Est. 8 min
          </span>
        </div>
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Page root
// ---------------------------------------------------------------------------

export default function ActiveSession() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-[#0a0a0a]"
      aria-label="Active training session"
    >
      {/* Top navigation bar */}
      <NavBar />

      {/* Three-column layout, offset by nav height */}
      <div
        className="absolute inset-x-0 bottom-0 flex"
        style={{ top: 48 }}
      >
        <CallPanel />
        <AICoachPanel />
        <ScenarioBriefPanel />
      </div>
    </div>
  )
}
