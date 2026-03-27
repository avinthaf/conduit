from app.repositories.supabase import supabase


class SessionRepository:
    def create(self, user_id: str, scenario_id: str) -> dict:
        response = (
            supabase.table("sessions")
            .insert({"user_id": user_id, "scenario_id": scenario_id})
            .execute()
        )
        return response.data[0]

    def fetch_by_id(self, session_id: str) -> dict:
        """Fetch a single session row by its UUID primary key."""
        response = (
            supabase.table("sessions")
            .select("*")
            .eq("id", session_id)
            .execute()
        )
        return response.data[0]
