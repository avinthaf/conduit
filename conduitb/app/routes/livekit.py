from flask import Blueprint, jsonify, request

from app.services.livekit_service import LiveKitService

bp = Blueprint("livekit", __name__, url_prefix="/api/livekit")

_service = LiveKitService()


@bp.post("/token")
def get_token():
    data = request.get_json(silent=True) or {}
    session_id = data.get("session_id")
    user_id = data.get("user_id")

    if not session_id or not user_id:
        return jsonify({"error": "session_id and user_id are required"}), 400

    name = data.get("name", user_id)
    result = _service.generate_token(session_id=session_id, identity=user_id, name=name)
    return jsonify(result), 200
