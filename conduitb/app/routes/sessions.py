from flask import Blueprint, request, jsonify
from app.services.session_service import SessionService

bp = Blueprint("sessions", __name__, url_prefix="/api/sessions")
_svc = SessionService()


@bp.route("", methods=["POST"])
def create_session():
    body = request.get_json()
    user_id = body.get("user_id")
    scenario_id = body.get("scenario_id")
    if not user_id or not scenario_id:
        return jsonify({"error": "user_id and scenario_id are required"}), 400
    session = _svc.create_session(user_id, scenario_id)
    return jsonify({"session": session}), 201
