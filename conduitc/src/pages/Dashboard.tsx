import * as React from "react"
import {
  Radio,
  Layers,
  Package,
  CreditCard,
  Wrench,
  TriangleAlert,
  Play,
  Search,
  MessageSquare,
  PhoneCall,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ScenarioPickerModal } from "@/components/ui/scenario-picker-modal"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SessionStatus = "completed" | "live"

interface Session {
  id: string
  name: string
  scenarioType: string
  scoreDisplay: string
  scoreColor: string
  date: string
  status: SessionStatus
  actionLabel: string
  actionColor: string
  iconType: "message-square" | "phone-call"
  iconColor: string
}

// ---------------------------------------------------------------------------
// Placeholder data — matches the design exactly
// ---------------------------------------------------------------------------

const SESSIONS: Session[] = [
  {
    id: "s1",
    name: "Billing Dispute #24",
    scenarioType: "Billing Issues",
    scoreDisplay: "92 / A",
    scoreColor: "#22c55e",
    date: "Mar 25, 2026",
    status: "completed",
    actionLabel: "Review →",
    actionColor: "#52525b",
    iconType: "message-square",
    iconColor: "#52525b",
  },
  {
    id: "s2",
    name: "Tech Escalation #23",
    scenarioType: "Escalations",
    scoreDisplay: "— / —",
    scoreColor: "#52525b",
    date: "Mar 26, 2026",
    status: "live",
    actionLabel: "Resume →",
    actionColor: "#3b82f6",
    iconType: "phone-call",
    iconColor: "#3b82f6",
  },
  {
    id: "s3",
    name: "Product Return #22",
    scenarioType: "Product Returns",
    scoreDisplay: "74 / C",
    scoreColor: "#f59e0b",
    date: "Mar 24, 2026",
    status: "completed",
    actionLabel: "Review →",
    actionColor: "#52525b",
    iconType: "message-square",
    iconColor: "#52525b",
  },
  {
    id: "s4",
    name: "Billing Dispute #21",
    scenarioType: "Billing Issues",
    scoreDisplay: "85 / B",
    scoreColor: "#a1a1aa",
    date: "Mar 23, 2026",
    status: "completed",
    actionLabel: "Review →",
    actionColor: "#52525b",
    iconType: "message-square",
    iconColor: "#52525b",
  },
  {
    id: "s5",
    name: "Tech Support #20",
    scenarioType: "Technical Support",
    scoreDisplay: "61 / D",
    scoreColor: "#ef4444",
    date: "Mar 21, 2026",
    status: "completed",
    actionLabel: "Review →",
    actionColor: "#52525b",
    iconType: "message-square",
    iconColor: "#52525b",
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Status badge — pill shape, green for completed, blue for live */
function StatusBadge({ status }: { status: SessionStatus }) {
  if (status === "live") {
    return (
      <span
        className="inline-flex items-center rounded-[100px] px-2 py-0.75"
        style={{ backgroundColor: "#172554" }}
        aria-label="Live session"
      >
        <span
          className="font-mono text-[10px] font-normal leading-none"
          style={{ color: "#93c5fd" }}
        >
          ● Live
        </span>
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center rounded-[100px] px-2 py-0.75"
      style={{ backgroundColor: "#14532d" }}
      aria-label="Completed session"
    >
      <span
        className="font-mono text-[10px] font-normal leading-none"
        style={{ color: "#86efac" }}
      >
        Completed
      </span>
    </span>
  )
}

/** Session icon — message-square for chat sessions, phone-call for escalations */
function SessionIcon({
  type,
  color,
}: {
  type: Session["iconType"]
  color: string
}) {
  const cls = "shrink-0"
  if (type === "phone-call") {
    return <PhoneCall aria-hidden="true" size={13} className={cls} style={{ color }} />
  }
  return <MessageSquare aria-hidden="true" size={13} className={cls} style={{ color }} />
}

/** Single table row */
function SessionRow({ session }: { session: Session }) {
  return (
    <div
      className="flex items-center w-full h-12"
      style={{ borderBottom: "1px solid #18181b" }}
      role="row"
    >
      {/* SESSION col — 260px */}
      <div
        className="flex items-center gap-2 h-full shrink-0 px-4"
        style={{ width: 260 }}
        role="cell"
      >
        <SessionIcon type={session.iconType} color={session.iconColor} />
        <span className="font-mono text-[12px] font-normal text-[#fafafa] leading-none truncate">
          {session.name}
        </span>
      </div>

      {/* SCENARIO TYPE col — 180px */}
      <div
        className="flex items-center h-full shrink-0 px-4"
        style={{ width: 180 }}
        role="cell"
      >
        <span className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-none">
          {session.scenarioType}
        </span>
      </div>

      {/* SCORE col — 100px */}
      <div
        className="flex items-center h-full shrink-0 px-4"
        style={{ width: 100 }}
        role="cell"
      >
        <span
          className="font-mono text-[12px] font-medium leading-none tabular-nums"
          style={{ color: session.scoreColor }}
        >
          {session.scoreDisplay}
        </span>
      </div>

      {/* DATE col — 140px */}
      <div
        className="flex items-center h-full shrink-0 px-4"
        style={{ width: 140 }}
        role="cell"
      >
        <span className="font-mono text-[12px] font-normal text-[#52525b] leading-none">
          {session.date}
        </span>
      </div>

      {/* STATUS col — 120px */}
      <div
        className="flex items-center h-full shrink-0 px-4"
        style={{ width: 120 }}
        role="cell"
      >
        <StatusBadge status={session.status} />
      </div>

      {/* ACTION col — fill */}
      <div
        className="flex items-center justify-end h-full flex-1 px-4"
        role="cell"
      >
        <button
          type="button"
          className="font-mono text-[11px] font-normal leading-none cursor-pointer transition-opacity duration-150 hover:opacity-70"
          style={{ color: session.actionColor }}
          aria-label={`${session.actionLabel} ${session.name}`}
        >
          {session.actionLabel}
        </button>
      </div>
    </div>
  )
}

/** Sidebar navigation item */
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 w-full rounded-lg px-2 py-1.5",
        "font-mono text-[12px] font-normal leading-none",
        "cursor-pointer transition-colors duration-150",
        active
          ? "bg-[#18181b] text-[#fafafa]"
          : "text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#18181b]/50"
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className="shrink-0"
        style={{ color: active ? "#fafafa" : "#52525b" }}
        aria-hidden="true"
      >
        {icon}
      </span>
      {label}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Dashboard page
// ---------------------------------------------------------------------------

export default function Dashboard() {
  const [query, setQuery] = React.useState("")
  const [modalOpen, setModalOpen] = React.useState(false)

  const filteredSessions = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SESSIONS
    return SESSIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.scenarioType.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] overflow-hidden"
      aria-label="Training dashboard"
    >
      {/* ------------------------------------------------------------------ */}
      {/* NavBar — 48px, full-width, absolute                                 */}
      {/* ------------------------------------------------------------------ */}
      <header
        className="flex items-center w-full h-12 px-8 bg-[#0a0a0a]"
        style={{ borderBottom: "1px solid #27272a" }}
        aria-label="Top navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Radio aria-hidden="true" size={16} className="text-[#fafafa]" />
          <span className="font-mono text-[14px] font-semibold text-[#fafafa] leading-none">
            Conduit
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav links */}
        <nav className="flex items-center gap-0.5" aria-label="Primary navigation">
          {/* Dashboard — active */}
          <span className="flex items-center rounded-lg bg-[#18181b] px-3 py-1.5">
            <span className="font-mono text-[13px] font-normal text-[#fafafa] leading-none">
              Dashboard
            </span>
          </span>
          {(["Sessions", "Knowledge Base", "Settings"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className="flex items-center rounded-lg px-3 py-1.5 font-mono text-[13px] font-normal text-[#71717a] leading-none cursor-pointer hover:text-[#a1a1aa] transition-colors duration-150"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Avatar */}
        <Avatar name="Jane Doe" size="sm" className="size-7" />
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Hero — 160px                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="flex flex-col gap-3 w-full bg-[#0a0a0a] px-16 py-10"
        style={{ borderBottom: "1px solid #27272a", minHeight: 160 }}
        aria-labelledby="dashboard-heading"
      >
        {/* Title row */}
        <div className="flex items-center gap-4 w-full">
          <h1
            id="dashboard-heading"
            className="font-mono text-[24px] font-semibold text-[#fafafa] leading-none"
          >
            Training Dashboard
          </h1>
          <div className="flex-1" />
          {/* CTA */}
          <Button
            variant="primary"
            size="default"
            className="flex items-center gap-2 px-5 py-2.5"
            onClick={() => setModalOpen(true)}
          >
            <Play aria-hidden="true" size={14} className="shrink-0 text-[#0a0a0a]" />
            Start Training Session
          </Button>
        </div>

        {/* Subtitle */}
        <p
          className="font-mono text-[13px] font-normal text-[#71717a] leading-relaxed"
          style={{ lineHeight: 1.6 }}
        >
          Practice customer service scenarios with an AI agent. Your AI coach
          listens in and surfaces relevant knowledge in real time.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Stats row — 80px                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="flex items-center w-full h-20 bg-[#0a0a0a] px-16"
        style={{ borderBottom: "1px solid #27272a" }}
        aria-label="Training statistics"
      >
        {/* Sessions Completed */}
        <div className="flex flex-col gap-0.5 pr-8">
          <span className="font-mono text-[22px] font-semibold text-[#fafafa] leading-none tabular-nums">
            24
          </span>
          <span className="font-mono text-[11px] font-normal text-[#52525b] leading-none">
            Sessions Completed
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[#27272a] shrink-0" aria-hidden="true" />

        {/* Avg Score */}
        <div className="flex flex-col gap-0.5 px-8">
          <span className="font-mono text-[22px] font-semibold text-[#fafafa] leading-none tabular-nums">
            87%
          </span>
          <span className="font-mono text-[11px] font-normal text-[#52525b] leading-none">
            Avg Score
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[#27272a] shrink-0" aria-hidden="true" />

        {/* Time Trained */}
        <div className="flex flex-col gap-0.5 px-8">
          <span className="font-mono text-[22px] font-semibold text-[#fafafa] leading-none tabular-nums">
            14h 20m
          </span>
          <span className="font-mono text-[11px] font-normal text-[#52525b] leading-none">
            Time Trained
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[#27272a] shrink-0" aria-hidden="true" />

        {/* Current Streak */}
        <div className="flex flex-col gap-0.5 pl-8">
          <span className="font-mono text-[22px] font-semibold leading-none tabular-nums" style={{ color: "#22c55e" }}>
            6 days
          </span>
          <span className="font-mono text-[11px] font-normal text-[#52525b] leading-none">
            Current Streak
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main content — sidebar + table                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex w-full bg-[#0a0a0a]" style={{ minHeight: "calc(100vh - 288px)" }}>

        {/* Sidebar — 220px */}
        <aside
          className="flex flex-col gap-0.5 shrink-0 bg-[#0a0a0a] px-4 py-6"
          style={{ width: 220, borderRight: "1px solid #27272a" }}
          aria-label="Scenario filter"
        >
          {/* Section label */}
          <span
            className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none px-2 pb-1 tracking-widest"
            aria-hidden="true"
          >
            SCENARIOS
          </span>

          <SidebarItem
            icon={<Layers size={13} />}
            label="All Scenarios"
            active
          />

          {/* Spacer */}
          <div className="h-1" />

          <SidebarItem icon={<Package size={13} />} label="Product Returns" />
          <SidebarItem icon={<CreditCard size={13} />} label="Billing Issues" />
          <SidebarItem icon={<Wrench size={13} />} label="Technical Support" />
          <SidebarItem icon={<TriangleAlert size={13} />} label="Escalations" />
        </aside>

        {/* Content area */}
        <main
          className="flex flex-col flex-1 px-8 py-6 min-w-0"
          aria-label="Sessions table"
        >
          {/* Table header row — title + search */}
          <div className="flex items-center gap-4 w-full pb-4">
            <h2 className="font-mono text-[16px] font-semibold text-[#fafafa] leading-none">
              Recent Sessions
            </h2>
            <div className="flex-1" />
            {/* Search input */}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.75 bg-[#111111]"
              style={{ border: "1px solid #27272a" }}
            >
              <Search aria-hidden="true" size={13} className="text-[#52525b] shrink-0" />
              <input
                type="text"
                placeholder="Filter sessions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  "bg-transparent border-none outline-none",
                  "font-mono text-[12px] font-normal text-[#fafafa]",
                  "placeholder:text-[#3f3f46]",
                  "leading-none w-40"
                )}
                aria-label="Filter sessions"
              />
            </div>
          </div>

          {/* Table */}
          <div
            className="w-full overflow-hidden rounded-lg"
            style={{ border: "1px solid #27272a" }}
            role="table"
            aria-label="Recent training sessions"
          >
            {/* Table head */}
            <div
              className="flex items-center w-full h-9 bg-[#111111]"
              style={{ borderBottom: "1px solid #27272a" }}
              role="row"
            >
              {/* SESSION */}
              <div
                className="flex items-center h-full shrink-0 px-4"
                style={{ width: 260 }}
                role="columnheader"
              >
                <span
                  className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none tracking-[0.06em]"
                >
                  SESSION
                </span>
              </div>

              {/* SCENARIO TYPE */}
              <div
                className="flex items-center h-full shrink-0 px-4"
                style={{ width: 180 }}
                role="columnheader"
              >
                <span className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none tracking-[0.06em]">
                  SCENARIO TYPE
                </span>
              </div>

              {/* SCORE */}
              <div
                className="flex items-center h-full shrink-0 px-4"
                style={{ width: 100 }}
                role="columnheader"
              >
                <span className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none tracking-[0.06em]">
                  SCORE
                </span>
              </div>

              {/* DATE */}
              <div
                className="flex items-center h-full shrink-0 px-4"
                style={{ width: 140 }}
                role="columnheader"
              >
                <span className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none tracking-[0.06em]">
                  DATE
                </span>
              </div>

              {/* STATUS */}
              <div
                className="flex items-center h-full shrink-0 px-4"
                style={{ width: 120 }}
                role="columnheader"
              >
                <span className="font-mono text-[10px] font-semibold text-[#3f3f46] leading-none tracking-[0.06em]">
                  STATUS
                </span>
              </div>

              {/* Action (empty label) */}
              <div
                className="flex items-center h-full flex-1 px-4"
                role="columnheader"
              />
            </div>

            {/* Table body */}
            <div role="rowgroup">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <SessionRow key={session.id} session={session} />
                ))
              ) : (
                <div className="flex items-center justify-center h-24 w-full">
                  <span className="font-mono text-[12px] font-normal text-[#52525b] leading-none">
                    No sessions match your filter.
                  </span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ScenarioPickerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onStart={(id) => {
          setModalOpen(false)
          // TODO: navigate to active session for scenario `id`
          console.log("Starting session for scenario:", id)
        }}
      />
    </div>
  )
}
