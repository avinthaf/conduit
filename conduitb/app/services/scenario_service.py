from app.repositories.scenario_repo import ScenarioRepository


class ScenarioService:
    def __init__(self):
        self.repo = ScenarioRepository()

    def list_all(self):
        return self.repo.fetch_all()
