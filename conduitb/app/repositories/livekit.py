"""LiveKit credentials singleton.

Loads LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET from the project
.env file and exposes them for use across all LiveKit services.
"""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=_env_path)

LIVEKIT_URL: str = os.environ["LIVEKIT_URL"]
LIVEKIT_API_KEY: str = os.environ["LIVEKIT_API_KEY"]
LIVEKIT_API_SECRET: str = os.environ["LIVEKIT_API_SECRET"]
