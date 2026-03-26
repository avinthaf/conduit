---
name: Pencil.dev MCP Design Patterns
description: Discovered patterns and gotchas when building multi-screen designs with pencil.dev MCP tools
type: reference
---

## Key patterns discovered

**Variable bindings expire after each batch_design call.** You cannot use a binding from call N in call N+1. Always use the literal node ID (e.g. `"ZgL1k"`) returned in the operation results. Plan operations in sequences where each call only chains within itself using same-call bindings.

**Containers before children.** When building nested structures, first create the parent frame in one call (to get its ID), then insert children in the next call using that ID.

**fit_content on empty frames triggers warnings.** Always populate frames with children in the same call or immediately after. Warnings don't fail the operation but flag visual zero-size issues.

**fill_container requires a flex parent.** Never set fill_container on a child whose parent has layout: "none" or no layout specified.

**width on text nodes requires textGrowth.** Never set width/height on text without also setting textGrowth: "fixed-width" (or "fixed-width-height"). The text node won't render correctly otherwise.

**Percentage widths are not supported.** Use absolute pixel values or fill_container/fit_content — "90%" is invalid and will fail.

**Icon names must match lucide exactly.** Use "triangle-alert" not "alert-triangle", "circle-check" not "check-circle", "chart-bar" not "bar-chart-2". When unsure, set iconFontName and then update if a potential-issues warning appears.

**Progress bars pattern:** Use a parent frame (fill_container, height:4, fill: dark-bg-color) with an absolutely-positioned child frame (fixed pixel width, height:4, fill: accent-color, layoutPosition:"absolute", x:0, y:0). Percentage widths not supported.

**Stroke with partial sides:** Use `stroke: {align:"inside", thickness:{bottom:1}, fill:"#color"}` for single-side borders (bottom nav lines, dividers). Works correctly.

**Placeholder protocol:** Always set placeholder:true immediately when inserting a frame you plan to work on. Remove it (U(id, {placeholder:false})) only when that frame is fully complete.

**layout:"horizontal" is the frame default.** Explicitly set layout:"vertical" on column containers — frames default to horizontal even when no layout is specified.

**Multiple screens workflow:** Create all placeholder frames first with their final x positions (1440px gaps work well for 1440w screens), then work on each screen sequentially.
