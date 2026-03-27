// ---------------------------------------------------------------------------
// Shared API types
// ---------------------------------------------------------------------------

export interface ApiScenario {
  id: string
  name: string
  type: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimated_minutes: number
  objectives: string[]
  customer_name: string | null
  customer_tier: string | null
  customer_sentiment: string | null
  customer_prior_contacts: number
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

const BASE_URL = "http://127.0.0.1:5000"

export async function getScenarios(): Promise<ApiScenario[]> {
  const response = await fetch(`${BASE_URL}/api/scenarios`)
  if (!response.ok) {
    throw new Error(`Failed to fetch scenarios: ${response.status} ${response.statusText}`)
  }
  const data = (await response.json()) as { scenarios: ApiScenario[] }
  return data.scenarios
}

export interface ApiSession {
  id: string
  user_id: string
  scenario_id: string
  status: "active" | "completed"
  started_at: string
}

export async function createSession(userId: string, scenarioId: string): Promise<ApiSession> {
  const response = await fetch(`${BASE_URL}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, scenario_id: scenarioId }),
  })
  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.status} ${response.statusText}`)
  }
  const data = (await response.json()) as { session: ApiSession }
  return data.session
}
