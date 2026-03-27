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

`customer-agent` simulates the customer persona in a Conduit training session. It is dispatched
explicitly — never auto-dispatched. Job metadata must be a JSON string matching the scenario
`prompt` JSONB shape:

```json
{
  "system": "...",
  "persona": "...",
  "objectives": ["..."]
}
```

The agent uses `system` + `persona` to build its instructions and opens the call by introducing
itself as the customer.

## Deployment

Agent name: `customer-agent`. Register with `lk agent create` from this directory.
