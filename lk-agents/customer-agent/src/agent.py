import json
import logging

from dotenv import load_dotenv

from livekit import agents, rtc
from livekit.agents import Agent, AgentServer, AgentSession, room_io, TurnHandlingOptions
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

load_dotenv(".env.local")

logger = logging.getLogger("customer-agent")


class CustomerAgent(Agent):
    def __init__(self, system: str, persona: str) -> None:
        instructions = f"{system}\n\n{persona}"
        super().__init__(instructions=instructions)


server = AgentServer()


@server.rtc_session(agent_name="customer-agent")
async def customer_agent(ctx: agents.JobContext):
    # Job metadata is a JSON string containing the scenario prompt fields:
    # { "system": "...", "persona": "...", "objectives": [...] }
    prompt: dict = {}
    if ctx.job.metadata:
        try:
            prompt = json.loads(ctx.job.metadata)
        except json.JSONDecodeError:
            logger.warning("Failed to parse job metadata as JSON: %s", ctx.job.metadata)

    system = prompt.get("system", "You are a customer contacting support.")
    persona = prompt.get("persona", "Speak naturally and wait for the agent to help you.")

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
        agent=CustomerAgent(system=system, persona=persona),
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

    await session.generate_reply(
        instructions="Start the conversation as the customer. Introduce yourself briefly and state why you are calling."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
