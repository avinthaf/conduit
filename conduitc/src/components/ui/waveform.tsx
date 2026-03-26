import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const BAR_COUNT = 32
const MIN_HEIGHT = 0.05

// Static idle pattern — bell-curved, symmetric
const IDLE_BARS: number[] = Array.from({ length: BAR_COUNT }, (_, i) => {
  const x = (i / (BAR_COUNT - 1)) * Math.PI
  return Math.max(MIN_HEIGHT, Math.sin(x) ** 2 * 0.75 + (i % 3 === 0 ? 0.1 : 0.05))
})

interface WaveformProps {
  /** When true, bars animate continuously like a live VoIP audio stream */
  active?: boolean
  /**
   * External bar heights (0–1). When provided AND active is false, these are
   * rendered directly (e.g. a frozen snapshot). When active is true the
   * animation runs regardless and this prop is ignored.
   */
  bars?: number[]
  className?: string
}

function Waveform({ active = false, bars, className }: WaveformProps) {
  const [heights, setHeights] = useState<number[]>(bars ?? IDLE_BARS)
  const rafRef = useRef<number | null>(null)
  const t0Ref = useRef<number>(0)

  useEffect(() => {
    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      setHeights(bars ?? IDLE_BARS)
      return
    }

    t0Ref.current = 0

    function frame(ts: number) {
      if (!t0Ref.current) t0Ref.current = ts
      const elapsed = (ts - t0Ref.current) / 1000 // seconds

      setHeights(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          // Each bar is a sum of two sine waves at slightly different
          // frequencies and phases — this produces the organic, speech-like
          // rise-and-fall of a real VoIP waveform.
          const phase = (i / BAR_COUNT) * Math.PI * 4
          const slow = Math.sin(elapsed * 2.8 + phase) * 0.35
          const fast = Math.sin(elapsed * 6.1 + phase * 1.7) * 0.15
          return Math.max(MIN_HEIGHT, 0.5 + slow + fast)
        })
      )

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, bars])

  return (
    <div
      data-slot="waveform"
      aria-label="Audio waveform"
      role="img"
      className={cn("flex items-center w-full h-10 gap-0.5", className)}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="flex-1 rounded-sm bg-[#3b82f6]"
          style={{ height: `${Math.round(Math.min(1, Math.max(MIN_HEIGHT, h)) * 100)}%` }}
        />
      ))}
    </div>
  )
}

export { Waveform }
export type { WaveformProps }
