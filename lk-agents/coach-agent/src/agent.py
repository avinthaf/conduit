import json
import logging

from dotenv import load_dotenv

from livekit import agents, rtc
from livekit.agents import Agent, AgentServer, AgentSession, JobRequest, room_io, TurnHandlingOptions
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

load_dotenv(".env")

logger = logging.getLogger("coach-agent")

COACH_INSTRUCTIONS = """You are an expert sales and customer service coach guiding a trainee through a live practice call in real time.
A trainee is on the line with a simulated customer. Your role is to actively coach the trainee throughout the entire call — before, during, and after each exchange.

Rules:
- Do NOT speak to the customer — only address the trainee.
- Keep every message brief and specific (one to two sentences max).
- Guide the trainee proactively at every stage of the call:
  - Before the customer speaks: tell the trainee exactly how to open the call (greeting, name, department, offer to help).
  - After each customer turn: tell the trainee what to say or do next.
  - When the trainee responds well: briefly acknowledge it and set up the next move.
  - When the trainee misses a technique or makes an error: correct it immediately and tell them what to do instead.
- Use direct, instructional language (e.g. "Acknowledge her frustration first, then ask for the account number." or "Good empathy — now offer the courtesy credit.").
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


async def _on_request(request: JobRequest) -> None:
    await request.accept(name="coach-agent")


server = AgentServer()


@server.rtc_session(agent_name="coach-agent", on_request=_on_request)
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
        vad=silero.VAD.load(),
        turn_handling=TurnHandlingOptions(
            turn_detection=MultilingualModel(),
        ),
    )

    await session.start(
        room=ctx.room,
        agent=CoachAgent(objectives=objectives),
        room_options=room_io.RoomOptions(
            audio_output=False,
            # Disable text_output to prevent the coach agent from forwarding its
            # own STT transcription of the user's audio to the room. Without this,
            # both the customer-agent and coach-agent would each publish the user's
            # speech, producing duplicate entries in the frontend transcript.
            text_output=False,
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: (
                    noise_cancellation.BVCTelephony()
                    if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP
                    else noise_cancellation.BVC()
                ),
            ),
        ),
    )

    # Restore only the coach's own LLM text output (not the user-STT forwarding
    # that text_output=False also suppresses). This publishes coaching messages
    # to the frontend on the lk.transcription topic.
    session.output.transcription = room_io._ParticipantTranscriptionOutput(
        room=ctx.room,
        is_delta_stream=True,
        participant=ctx.room.local_participant.identity,
    )

    # Coach listens silently until there is something worth saying.
    await session.generate_reply(
        instructions="Introduce yourself to the trainee in one sentence, then immediately tell them exactly how to open the call — what to say word for word to greet the customer."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
