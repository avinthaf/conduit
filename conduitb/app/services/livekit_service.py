from __future__ import annotations

import json

from livekit.api import AccessToken, RoomAgentDispatch, RoomConfiguration, VideoGrants

from app.repositories.livekit import LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL
from app.repositories.scenario_repo import ScenarioRepository
from app.repositories.session_repo import SessionRepository


class LiveKitService:
    def __init__(
        self,
        session_repo: SessionRepository | None = None,
        scenario_repo: ScenarioRepository | None = None,
    ) -> None:
        self._session_repo = session_repo or SessionRepository()
        self._scenario_repo = scenario_repo or ScenarioRepository()

    def generate_token(self, session_id: str, identity: str, name: str) -> dict:
        """Generate a LiveKit room token and dispatch both AI agents with the scenario prompt."""
        session = self._session_repo.fetch_by_id(session_id)
        scenario = self._scenario_repo.fetch_by_id(session["scenario_id"])
        prompt_json = json.dumps(scenario["prompt"])

        room_config = RoomConfiguration(
            agents=[
                RoomAgentDispatch(agent_name="customer-agent", metadata=prompt_json),
                RoomAgentDispatch(agent_name="coach-agent", metadata=prompt_json),
            ]
        )

        token = (
            AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
            .with_identity(identity)
            .with_name(name)
            .with_grants(VideoGrants(room_join=True, room=session_id))
            .with_room_config(room_config)
        )
        return {"token": token.to_jwt(), "url": LIVEKIT_URL, "room": session_id}
