from livekit.api import AccessToken, VideoGrants

from app.repositories.livekit import LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL


class LiveKitService:
    def generate_token(self, session_id: str, identity: str, name: str) -> dict:
        token = (
            AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
            .with_identity(identity)
            .with_name(name)
            .with_grants(VideoGrants(room_join=True, room=session_id))
        )
        return {"token": token.to_jwt(), "url": LIVEKIT_URL, "room": session_id}
