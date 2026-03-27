from app.repositories.session_repo import SessionRepository


class SessionService:
    def __init__(self):
        self.repo = SessionRepository()

    def create_session(self, user_id: str, scenario_id: str) -> dict:
        return self.repo.create(user_id, scenario_id)
