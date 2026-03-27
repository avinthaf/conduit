from app.repositories.supabase import supabase


class ScenarioRepository:
    def fetch_all(self):
        response = supabase.table("scenarios").select("*").execute()
        return response.data
