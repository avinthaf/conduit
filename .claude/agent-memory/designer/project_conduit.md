---
name: Conduit — AI Training App Design
description: Design system and 5 screens for Conduit, an AI-assisted customer service training web app with VoIP + AI coach interface
type: project
---

Conduit is a desktop-only web app for training customer service reps. Trainees role-play with an AI customer via VoIP while an AI coach listens in and surfaces SOPs and product info in a side panel.

**Design language:** Near-black dark mode (#0a0a0a bg), zinc-gray neutrals (shadcn/ui palette), IBM Plex Mono throughout — code-native, developer-dashboard aesthetic. No gradients, no illustrations, icon + data-forward.

**Screens designed:**
1a. Dashboard / Session Lobby (BwmbB, x=1520) — nav, hero CTA, stats row (sessions/score/time/streak), scenario filter sidebar, recent sessions table with status badges
1b. Dashboard (Modal Open) (veUqd, x=1520, y=1040) — copy of Dashboard with "Select a Training Scenario" modal overlaid; dim backdrop (#0a0a0aCC), 800×800px centered modal (#111111, #27272a border, 6px radius), 4 scenario cards (selected=blue #3b82f6 border + check indicator, unselected=#27272a border), difficulty badges (Easy=#22c55e/#052e16, Medium=#f59e0b/#2d1b00, Hard=#ef4444/#450a0a), category tags (#3b82f6/#172554), footer with Cancel (secondary) + Start Session (primary, play icon) buttons
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

**Component Library frame (Q9ddV):** A dedicated frame placed at x:0, y:1100 (below all screens), labeled "Component Library". Contains all extracted reusable UI components grouped into 9 labelled sections with section header labels and component name labels above each item:
1. BUTTONS — Primary, Secondary, Destructive, End Call (pill), Ghost, Nav Active, Nav Inactive
2. BADGES & PILLS — Completed, Live (dot + LIVE), Grade, Tool Call Blue (#172554), Tool Call Amber (#2d1b00), Live Indicator (scenario dot), Difficulty badge
3. INPUTS — Default (labelled), Search (icon), Error (red stroke + error msg + icon), AI Chat Bar, Password Strength (track + amber fill + label)
4. NAVIGATION — Full Top NavBar (logo+links+avatar), Avatar/User, Sidebar Nav Item Active, Sidebar Nav Item Inactive, Breadcrumb trail
5. CALL CONTROLS — Caller Avatar Block (48px circle + name + LIVE chip), Waveform (blue bars), VoIP Controls (Mute/Hold/End Call)
6. CARDS — Tool Call Card (tag+body+KB footer), Score Badge (88×88), Context/Info Card (key-value rows), Knowledge Gap Card, Strengths Card (green), Improve Card (amber+flagged item)
7. DATA DISPLAY — Stat Counter, Stat Streak (green), Score Bars (green/amber tracks), Transcript Row Customer, Transcript Row Trainee, Flagged Bubble, Table Session Row (5-col)
8. MISCELLANEOUS — Timer Display, Trainee Indicator, AI Coach Status Header, Send Button, Objectives Card, OR Divider, Google Button, Auth Footer Link
9. MODALS — Modal / Scenario Picker (reusable component id: jNp3I; 800×800px; header+4 scenario cards+footer; card 1 = selected/blue state, cards 2-4 = default/zinc state)

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

**Waveform component (updated):** Two side-by-side variants inside `wrap-waveform` (horizontal layout, gap:32, fit_content width):
- **idle** — 32 bars, 8px wide, 2px gap, cornerRadius:999 (pill), #3b82f6, bell-curve heights (3→36→3px), centered vertically in 320×40px #0a0a0a container
- **active** — same bar spec, two-peak sine wave heights (two full crests separated by a trough at 2px), suggesting motion
- Bar heights grow from the center outward (alignItems:center on parent, fixed heights on bars — not fill_container)
- Label text ("idle" / "active") sits above each container in a vertical wrapper frame

**File:** design.pen at /Users/avintha/Desktop/conduit/design.pen (active in editor)

**Screen x-positions (1440px wide each, 960px tall):**
- Screen 1a Dashboard: x=1520, y=0
- Screen 1b Dashboard (Modal Open): x=1520, y=1040
- Screen 2 Active Session: x=3040
- Screen 3 Post-Session Review: x=4560
- Screen 4 Login: x=6080
- Screen 5 Sign Up: x=7600

**Why:** MVP design for a training platform product concept. No dev implementation yet.

**How to apply:** File is design.pen. All node IDs from previous sessions expire — use batch_get to rediscover IDs before making changes.
