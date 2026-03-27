import json
import logging

from dotenv import load_dotenv

from livekit import agents, rtc
from livekit.agents import Agent, AgentServer, AgentSession, room_io, TurnHandlingOptions
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

load_dotenv(".env.local")

logger = logging.getLogger("coach-agent")

COACH_INSTRUCTIONS = """You are an expert sales and customer service coach observing a live training session.
A trainee is practicing handling a customer call. Your role is to listen to the full conversation and
provide concise, actionable coaching notes.

Rules:
- Do NOT speak to the customer — only address the trainee.
- Keep interventions brief and specific (one sentence).
- Only interject when there is a clear coaching opportunity: a missed technique, an opportunity to de-escalate, or a chance to improve the outcome.
- After the call ends you will be asked to provide a structured debrief.
"""


class CoachAgent(Agent):
    def __init__(self, objectives: list[str]) -> None:
        objectives_text = "\n".join(f"- {o}" for o in objectives)
        instructions = (
            f"{COACH_INSTRUCTIONS}\n\n"
            f"Scenario objectives the trainee should meet:\n{objectives_text}"
        )
        super().__init__(instructions=instructions)


server = AgentServer()


@server.rtc_session(agent_name="coach-agent")
async def coach_agent(ctx: agents.JobContext):
    # Job metadata carries the scenario prompt, same shape as customer-agent:
    # { "system": "...", "persona": "...", "objectives": [...] }
    objectives: list[str] = []
    if ctx.job.metadata:
        try:
            prompt = json.loads(ctx.job.metadata)
            objectives = prompt.get("objectives", [])
        except json.JSONDecodeError:
            logger.warning("Failed to parse job metadata as JSON: %s", ctx.job.metadata)

    session = AgentSession(
        stt="deepgram/nova-3:multi",
        llm="openai/gpt-4.1-mini",
        tts="cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        vad=silero.VAD.load(),
        turn_handling=TurnHandlingOptions(
            turn_detection=MultilingualModel(),
        ),
    )

    await session.start(
        room=ctx.room,
        agent=CoachAgent(objectives=objectives),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: (
                    noise_cancellation.BVCTelephony()
                    if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP
                    else noise_cancellation.BVC()
                ),
            ),
        ),
    )

    # Coach listens silently until there is something worth saying.
    await session.generate_reply(
        instructions="Briefly introduce yourself to the trainee and let them know you are observing. Keep it to one sentence."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
