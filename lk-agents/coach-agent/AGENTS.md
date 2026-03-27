# AGENTS.md

This is a LiveKit Agents project. See the root CLAUDE.md for overall monorepo context.

## Project structure

Uses `uv`. All app code is in `src/agent.py`.

## Commands

```bash
uv sync                                    # install dependencies
uv run src/agent.py download-files        # download VAD + turn-detector models (first run)
uv run src/agent.py console               # run locally in terminal
uv run src/agent.py dev                   # run in dev mode (connects to LiveKit)
uv run src/agent.py start                 # production mode
uv run pytest                             # run tests
uv run ruff format                        # format
uv run ruff check                         # lint
```

## Agent behaviour

`coach-agent` joins a Conduit training session as a silent observer and provides live coaching
to the trainee (not the customer). It is dispatched explicitly alongside `customer-agent`.

Job metadata must be a JSON string matching the scenario `prompt` JSONB shape:

```json
{
  "system": "...",
  "persona": "...",
  "objectives": ["..."]
}
```

The agent uses `objectives` to evaluate the trainee against the scenario's success criteria and
interjects with brief, actionable coaching notes when warranted.

## Deployment

Agent name: `coach-agent`. Register with `lk agent create` from this directory.
