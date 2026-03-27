import * as React from "react"
import { X, Play, CircleCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { type ApiScenario, getScenarios } from "@/lib/api"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Difficulty = "Easy" | "Medium" | "Hard"

interface Scenario {
  id: string
  name: string
  description: string
  difficulty: Difficulty
  category: string
}

interface ScenarioPickerModalProps {
  open: boolean
  onClose: () => void
  onStart: (scenarioId: string) => void
}

// ---------------------------------------------------------------------------
// Map DB values to display values
// ---------------------------------------------------------------------------

const DIFFICULTY_MAP: Record<ApiScenario["difficulty"], Difficulty> = {
  Beginner:     "Easy",
  Intermediate: "Medium",
  Advanced:     "Hard",
}

function toScenario(api: ApiScenario): Scenario {
  return {
    id:         api.id,
    name:       api.name,
    description: api.objectives[0] ?? "",
    difficulty: DIFFICULTY_MAP[api.difficulty],
    category:   api.type,
  }
}

// ---------------------------------------------------------------------------
// Difficulty badge — inline styled per design tokens
// Easy  = green  text on #052e16 bg
// Medium= amber  text on #2d1b00 bg
// Hard  = red    text on #450a0a bg
// ---------------------------------------------------------------------------

const DIFFICULTY_STYLES: Record<
  Difficulty,
  { bg: string; color: string }
> = {
  Easy:   { bg: "#052e16", color: "#22c55e" },
  Medium: { bg: "#2d1b00", color: "#f59e0b" },
  Hard:   { bg: "#450a0a", color: "#ef4444" },
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { bg, color } = DIFFICULTY_STYLES[difficulty]
  return (
    <span
      className="inline-flex items-center rounded-[4px] px-2 py-[3px]"
      style={{ backgroundColor: bg }}
      aria-label={`Difficulty: ${difficulty}`}
    >
      <span
        className="font-mono text-[10px] font-medium leading-none whitespace-nowrap"
        style={{ color }}
      >
        {difficulty}
      </span>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Category tag — blue bg for most, muted stone bg for "Technical Support"
// ---------------------------------------------------------------------------

function CategoryTag({ category }: { category: string }) {
  const isMuted = category === "Technical Support"
  return (
    <span
      className="inline-flex items-center rounded-[4px] px-2 py-[3px]"
      style={{ backgroundColor: isMuted ? "#1c1917" : "#172554" }}
      aria-label={`Category: ${category}`}
    >
      <span
        className="font-mono text-[10px] font-medium leading-none whitespace-nowrap"
        style={{ color: isMuted ? "#a1a1aa" : "#3b82f6" }}
      >
        {category}
      </span>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Scenario card
// ---------------------------------------------------------------------------

function ScenarioCard({
  scenario,
  selected,
  onClick,
}: {
  scenario: Scenario
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg p-4 flex flex-col gap-2.5",
        "transition-colors duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a0a0a]"
      )}
      style={{
        backgroundColor: "#111111",
        border: `1px solid ${selected ? "#3b82f6" : "#27272a"}`,
      }}
      aria-pressed={selected}
      aria-label={`Select scenario: ${scenario.name}`}
    >
      {/* Top row — name + badges */}
      <div className="flex items-center justify-between w-full">
        <span className="font-mono text-[13px] font-semibold text-[#fafafa] leading-none">
          {scenario.name}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          <DifficultyBadge difficulty={scenario.difficulty} />
          <CategoryTag category={scenario.category} />
        </div>
      </div>

      {/* Description */}
      <p
        className="font-mono text-[12px] font-normal text-[#a1a1aa] leading-relaxed w-full"
        style={{ lineHeight: 1.6 }}
      >
        {scenario.description}
      </p>

      {/* Selected indicator */}
      {selected && (
        <div className="flex items-center gap-1.5 w-full">
          <CircleCheck
            aria-hidden="true"
            size={12}
            className="shrink-0 text-[#3b82f6]"
          />
          <span className="font-mono text-[11px] font-normal text-[#3b82f6] leading-none">
            Selected
          </span>
        </div>
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// ScenarioPickerModal
// ---------------------------------------------------------------------------

export function ScenarioPickerModal({
  open,
  onClose,
  onStart,
}: ScenarioPickerModalProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [scenarios, setScenarios] = React.useState<Scenario[]>([])
  const [loading, setLoading] = React.useState(false)

  // Fetch scenarios + reset selection when modal opens
  React.useEffect(() => {
    if (!open) return
    setSelectedId(null)
    setLoading(true)
    getScenarios()
      .then((apiScenarios) => {
        setScenarios(apiScenarios.map(toScenario))
      })
      .finally(() => setLoading(false))
  }, [open])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  // Prevent body scroll while open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  function handleStart() {
    if (!selectedId) return
    onStart(selectedId)
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.80)" }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="scenario-picker-title"
      onClick={onClose}
    >
      {/* Modal panel — stop click propagation so backdrop click works */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 800,
          maxHeight: "90vh",
          backgroundColor: "#111111",
          border: "1px solid #27272a",
          borderRadius: 6,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="flex items-center justify-between w-full shrink-0 px-6"
          style={{
            height: 64,
            borderBottom: "1px solid #27272a",
            backgroundColor: "#111111",
          }}
        >
          {/* Title + subtitle */}
          <div className="flex flex-col gap-0.5">
            <h2
              id="scenario-picker-title"
              className="font-mono text-[16px] font-semibold text-[#fafafa] leading-none"
            >
              Select a Training Scenario
            </h2>
            <p className="font-mono text-[12px] font-normal text-[#71717a] leading-none">
              Choose a scenario to begin your session
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex items-center justify-center shrink-0 rounded-lg",
              "transition-colors duration-150 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            )}
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
            aria-label="Close modal"
          >
            <X aria-hidden="true" size={14} className="text-[#a1a1aa]" />
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Body — scrollable scenario list                                   */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="flex flex-col gap-3 w-full overflow-y-auto px-6 py-5"
          style={{ backgroundColor: "#0a0a0a", flex: "1 1 auto", minHeight: 0 }}
        >
          {loading ? (
            <p className="font-mono text-[12px] text-[#71717a] py-4 text-center">
              Loading scenarios…
            </p>
          ) : (
            scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                selected={selectedId === scenario.id}
                onClick={() =>
                  setSelectedId(
                    selectedId === scenario.id ? null : scenario.id
                  )
                }
              />
            ))
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="flex items-center justify-end gap-3 w-full shrink-0 px-6"
          style={{
            height: 68,
            borderTop: "1px solid #27272a",
            backgroundColor: "#111111",
          }}
        >
          <Button
            variant="secondary"
            size="default"
            onClick={onClose}
            className="h-9 px-4"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="default"
            onClick={handleStart}
            disabled={!selectedId}
            className="flex items-center gap-2 h-9 px-5"
          >
            <Play aria-hidden="true" size={13} className="shrink-0" />
            Start Session
          </Button>
        </div>
      </div>
    </div>
  )
}
