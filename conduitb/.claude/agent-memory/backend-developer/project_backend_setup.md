---
name: Backend project setup
description: Flask backend runtime details — venv location, env file, Supabase client pattern
type: project
---

The conduitb Flask backend uses a venv at `conduitb/env/` (not `.venv/`). The pip binary is at `conduitb/env/bin/pip`.

Env vars live in `conduitb/.env` (must be created manually — not committed). The required vars are `SUPABASE_URL` and `SUPABASE_KEY`. Do not confuse with `VITE_`-prefixed frontend vars.

The Supabase client singleton is at `app/repositories/supabase.py`. It uses `load_dotenv` pointing to an absolute path resolved relative to the file (`Path(__file__).resolve().parents[3] / ".env"`) so it works regardless of launch directory.

**Why:** Singleton pattern avoids re-creating the client on every import; path-relative dotenv load keeps the module self-contained.

**How to apply:** Any repository that needs the Supabase client imports `from app.repositories.supabase import supabase` — never call `create_client` directly elsewhere.
