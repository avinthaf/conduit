import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KnowledgeGapCard } from "@/components/ui/knowledge-gap-card"
import { ScoreBar } from "@/components/ui/score-bar"
import { SessionTimer } from "@/components/ui/session-timer"
import { StatCard } from "@/components/ui/stat-card"
import { ToolCallCard } from "@/components/ui/tool-call-card"
import { TranscriptRow } from "@/components/ui/transcript-row"
import { Waveform } from "@/components/ui/waveform"

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-[11px] font-medium tracking-widest uppercase text-[#52525b] whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-[#27272a]" />
      </div>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Row of items with optional label under each
// ---------------------------------------------------------------------------
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end gap-3">{children}</div>
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <span className="font-mono text-[11px] text-[#52525b]">{label}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function ComponentLibraryPreview() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="font-mono text-[20px] font-semibold text-[oklch(0.985_0_0)]">
            Conduit
          </h1>
          <p className="font-mono text-[13px] text-[#a1a1aa]">Component Library</p>
        </div>

        {/* ---------------------------------------------------------------- */}
        <Section title="Buttons">
          <Row>
            <Item label="primary"><Button variant="primary">Start Session</Button></Item>
            <Item label="secondary"><Button variant="secondary">Cancel</Button></Item>
            <Item label="destructive"><Button variant="destructive">Delete</Button></Item>
            <Item label="endCall"><Button variant="endCall">End Call</Button></Item>
            <Item label="ghost"><Button variant="ghost">View Details</Button></Item>
            <Item label="navActive"><Button variant="navActive" size="nav">Dashboard</Button></Item>
            <Item label="navInactive"><Button variant="navInactive" size="nav">Sessions</Button></Item>
          </Row>
          <Row>
            <Item label="primary / sm"><Button variant="primary" size="sm">Save</Button></Item>
            <Item label="secondary / lg"><Button variant="secondary" size="lg">Continue with Google</Button></Item>
            <Item label="ghost / icon"><Button variant="ghost" size="icon">→</Button></Item>
            <Item label="primary / disabled"><Button variant="primary" disabled>Disabled</Button></Item>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Badges">
          <Row>
            <Item label="completed"><Badge variant="completed">Completed</Badge></Item>
            <Item label="live"><Badge variant="live">Live</Badge></Item>
            <Item label="grade"><Badge variant="grade">A</Badge></Item>
            <Item label="toolCallBlue"><Badge variant="toolCallBlue">Knowledge Base</Badge></Item>
            <Item label="toolCallAmber"><Badge variant="toolCallAmber">SOP</Badge></Item>
            <Item label="difficulty"><Badge variant="difficulty">Intermediate</Badge></Item>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Inputs">
          <div className="grid grid-cols-2 gap-6">
            <Input variant="default" label="Email" placeholder="you@company.com" />
            <Input variant="search" placeholder="Search sessions…" />
            <Input
              variant="error"
              label="Password"
              placeholder="••••••••"
              errorMessage="Password must be at least 8 characters."
            />
            <Input
              variant="password"
              label="New Password"
              placeholder="••••••••"
              strength={45}
            />
          </div>
          <Input variant="chat" placeholder="Ask the AI coach…" />
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Avatar">
          <Row>
            <Item label="sm"><Avatar name="Maya Chen" size="sm" /></Item>
            <Item label="md"><Avatar name="Jordan Lee" size="md" /></Item>
            <Item label="lg"><Avatar name="Sam Rivera" size="lg" /></Item>
            <Item label="with src">
              <Avatar
                name="Alex Kim"
                src="https://i.pravatar.cc/48?img=3"
                size="lg"
              />
            </Item>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Stat Card">
          <Row>
            <Item label="sessions">
              <StatCard label="Sessions Completed" value="24" />
            </Item>
            <Item label="avg score">
              <StatCard label="Avg Score" value="87" suffix="%" />
            </Item>
            <Item label="time trained">
              <StatCard label="Time Trained" value="14h" suffix="20m" />
            </Item>
            <Item label="streak">
              <StatCard label="Day Streak" value="6" suffix="days" />
            </Item>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Score Bar">
          <div className="flex flex-col gap-3 max-w-sm">
            <ScoreBar label="Empathy" score={92} variant="green" />
            <ScoreBar label="Policy Knowledge" score={78} variant="green" />
            <ScoreBar label="Communication" score={55} variant="amber" />
            <ScoreBar label="Escalation" score={40} variant="amber" />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Session Timer">
          <Row>
            <Item label="no label"><SessionTimer seconds={312} /></Item>
            <Item label="with label"><SessionTimer seconds={312} label="Session Duration" /></Item>
            <Item label="zero"><SessionTimer seconds={0} label="Elapsed" /></Item>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Waveform">
          <div className="flex flex-col gap-4 max-w-sm">
            <Item label="idle">
              <Waveform />
            </Item>
            <Item label="active (pulsing)">
              <Waveform active />
            </Item>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Transcript Row">
          <div className="border border-[#27272a] rounded-[4px] divide-y divide-[#27272a] px-4">
            <TranscriptRow
              speaker="customer"
              name="Maya Chen"
              timestamp="0:42"
              message="Hi, I've been charged twice for my subscription this month and I need this resolved immediately."
            />
            <TranscriptRow
              speaker="trainee"
              name="You"
              timestamp="0:48"
              message="I completely understand your frustration, Maya. Let me pull up your account right now and take a look."
            />
            <TranscriptRow
              speaker="customer"
              name="Maya Chen"
              timestamp="0:55"
              message="I've already called twice this week. This is unacceptable."
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Tool Call Card">
          <div className="grid grid-cols-2 gap-3">
            <ToolCallCard
              type="kb"
              title="Refund Policy — Duplicate Charges"
              body="Duplicate charges are eligible for full refund within 30 days. Initiate via the Billing portal under Account > Refunds."
              source="KB-2041 · billing/refund-policy"
            />
            <ToolCallCard
              type="sop"
              title="Escalation Path — Billing Tier 2"
              body="If the customer has contacted support more than twice for the same issue, escalate to Billing Tier 2 immediately."
              source="SOP-0118 · escalation/billing-t2"
            />
            <ToolCallCard
              type="escalation"
              title="Supervisor Transfer Protocol"
              body="Warm transfer to a supervisor after documenting the case number and summarizing the customer's concern."
            />
            <ToolCallCard
              type="kb"
              title="ProX Headset — Compatibility Specs"
              body="Compatible with Windows 10+, macOS 12+, and all major VoIP clients. USB-C and 3.5mm adapters included."
              source="KB-1088 · products/prox-headset"
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section title="Knowledge Gap Card">
          <div className="grid grid-cols-3 gap-3">
            <KnowledgeGapCard
              tag="Billing"
              title="Duplicate Charge Refund Process"
              articleId="KB-2041"
              href="#"
            />
            <KnowledgeGapCard
              tag="SOP"
              title="When to Escalate to Tier 2"
              articleId="SOP-0118"
              href="#"
            />
            <KnowledgeGapCard
              tag="Products"
              title="ProX Headset Specs & Compatibility"
              articleId="KB-1088"
            />
          </div>
        </Section>

      </div>
    </div>
  )
}

export default ComponentLibraryPreview
