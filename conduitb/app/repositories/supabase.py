"""Supabase client singleton.

Loads SUPABASE_URL and SUPABASE_KEY from the project .env file and exposes a
single ``supabase`` client instance for use across all repositories.
"""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client

# Load .env from the project root (conduitb/.env), not the cwd, so the
# singleton works regardless of where the process is launched from.
_env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=_env_path)

_url: str = os.environ["SUPABASE_URL"]
_key: str = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(_url, _key)
