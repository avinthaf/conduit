from app.repositories.supabase import supabase


class ScenarioRepository:
    def fetch_all(self):
        response = supabase.table("scenarios").select("*").execute()
        return response.data

    def fetch_by_id(self, scenario_id: str) -> dict:
        """Fetch a single scenario row by its UUID primary key."""
        response = (
            supabase.table("scenarios")
            .select("*")
            .eq("id", scenario_id)
            .execute()
        )
        return response.data[0]
