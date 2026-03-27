from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    from app.routes.health import bp as health_bp
    app.register_blueprint(health_bp)

    from app.routes.scenarios import bp as scenarios_bp
    app.register_blueprint(scenarios_bp)

    from app.routes.sessions import bp as sessions_bp
    app.register_blueprint(sessions_bp)

    return app
