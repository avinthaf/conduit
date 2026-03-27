from flask import Blueprint
from app.services.scenario_service import ScenarioService

bp = Blueprint("scenarios", __name__, url_prefix="/api/scenarios")
_svc = ScenarioService()


@bp.route("", methods=["GET"])
def list_scenarios():
    return {"scenarios": _svc.list_all()}, 200
