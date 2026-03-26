---
name: Conduit — AI Training App Design
description: Design system and 5 screens for Conduit, an AI-assisted customer service training web app with VoIP + AI coach interface
type: project
---

Conduit is a desktop-only web app for training customer service reps. Trainees role-play with an AI customer via VoIP while an AI coach listens in and surfaces SOPs and product info in a side panel.

**Design language:** Near-black dark mode (#0a0a0a bg), zinc-gray neutrals (shadcn/ui palette), IBM Plex Mono throughout — code-native, developer-dashboard aesthetic. No gradients, no illustrations, icon + data-forward.

**Screens designed:**
1. Dashboard / Session Lobby — nav, hero CTA, stats row (sessions/score/time/streak), scenario filter sidebar, recent sessions table with status badges
2. Active Training Session — 3-column layout: left call panel (avatar, waveform, transcript, VoIP controls), center AI Coach chat (tool call cards inline, chat input), right context drawer (scenario brief, customer profile, objectives)
3. Post-Session Review — score badge header, breadcrumb nav, transcript replay with flagged moments, AI feedback (strengths/improve/score breakdown bars), knowledge gaps (linked KB/SOP cards), recommended next scenario CTA
4. Login — centered 400px card on #0a0a0a, logo + tagline above card, Email + Password fields, white "Sign in" CTA, "Forgot password?" ghost link, OR divider + "Continue with Google" secondary button, "Don't have an account? Sign up" footer
5. Sign Up — same centered card layout, Full Name + Work Email + Password (with red error border + inline error message + amber strength bar) + Confirm Password fields, "Create account" CTA, ToS fine print, OR divider + Google SSO, "Already have an account? Sign in" footer

**Auth screen patterns:**
- Card: 400px wide, #111111 fill, 4px radius, #27272a 1px inside stroke, 32px padding, 20px gap between field groups
- Input fields: 40px height, #18181b fill, 4px radius, #27272a stroke (error state: #ef4444 stroke)
- Error state: red (#ef4444) stroke on input + icon_font "circle-alert" + error text below field group
- Password strength bar: parent track frame (fill_container width, 4px height, #27272a fill, layout:none) with absolutely-positioned fill child (fixed pixel width, amber #f59e0b) + label text beside it
- Primary CTA button: #fafafa fill, #0a0a0a text, 40px height, fill_container width
- Secondary/SSO button: #18181b fill, #27272a stroke, globe icon + label, 40px height
- OR divider: horizontal frame with fill_container lines (height:1, #27272a) flanking "or" text
- Footer links: underline:true on the action link, muted color on the label text

**File:** design.pen (active file, located at /Users/avintha/Desktop/conduit/design.pen)

**Key palette:**
- bg-base: #0a0a0a
- bg-raised: #111111
- surface: #18181b
- border: #27272a
- text-primary: #fafafa
- text-secondary: #a1a1aa
- text-muted: #71717a
- success: #22c55e
- warning: #f59e0b
- error: #ef4444
- info: #3b82f6

**Font:** IBM Plex Mono — all weights, all sizes. Monospace enforces code-native density aesthetic.

**Tool call cards:** Inline in AI chat, compact bordered (#27272a) cards with color-coded type pill (blue = KB retrieval, amber = SOP/escalation), body text, footer with KB article reference. Hugely effective pattern for AI-assisted UI.

**Waveform component:** Row of rectangles with varying heights (10–44px) colored in blue shades (#3b82f6, #2563eb, #1d4ed8) fading to zinc for inactive zones — effective visual indicator of live audio.

**File:** design.pen at /Users/avintha/Desktop/conduit/design.pen (active in editor)

**Screen x-positions (1440px wide each, 960px tall):**
- Screen 1 Dashboard: x=1520
- Screen 2 Active Session: x=3040
- Screen 3 Post-Session Review: x=4560
- Screen 4 Login: x=6080
- Screen 5 Sign Up: x=7600

**Why:** MVP design for a training platform product concept. No dev implementation yet.

**How to apply:** File is design.pen. All node IDs from previous sessions expire — use batch_get to rediscover IDs before making changes.
