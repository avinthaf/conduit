from app.repositories.supabase import supabase


class SessionRepository:
    def create(self, user_id: str, scenario_id: str) -> dict:
        response = (
            supabase.table("sessions")
            .insert({"user_id": user_id, "scenario_id": scenario_id})
            .execute()
        )
        return response.data[0]
