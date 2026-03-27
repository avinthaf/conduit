from flask import Blueprint

bp = Blueprint("health", __name__)


@bp.route("/")
def health():
    return {"message": "Hello, World!"}
