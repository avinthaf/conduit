---
name: Routing setup
description: react-router declarative routing structure — BrowserRouter location, route table, and page component conventions
type: project
---

React Router v7 (`react-router` package) is installed and configured in declarative mode.

**BrowserRouter** is mounted in `src/main.tsx`, wrapping `<App />` inside `<StrictMode>`.

**Route table** lives in `src/App.tsx` using `<Routes>` + `<Route>` JSX — not `createBrowserRouter`.

| Path | Component |
|---|---|
| `/` | `<Navigate to="/dashboard" replace />` |
| `/login` | `src/pages/Login.tsx` |
| `/signup` | `src/pages/SignUp.tsx` |
| `/dashboard` | `src/pages/Dashboard.tsx` |
| `/session/active` | `src/pages/ActiveSession.tsx` |
| `/session/review` | `src/pages/PostSessionReview.tsx` |

All page components use `export default function`. No auth guards are in place yet.

**Why:** Initial routing scaffold — auth guards to be added later.
**How to apply:** When adding new routes, add a `<Route>` entry in `src/App.tsx`. When adding navigation links inside page components, import `Link` or `NavLink` from `react-router`.
