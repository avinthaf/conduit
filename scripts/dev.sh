#!/usr/bin/env bash
# Start all Conduit services for local development.
# Usage: ./scripts/dev.sh
# Press Ctrl+C once to stop everything.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Colors for prefixed log output
RED='\033[0;31m'; YELLOW='\033[0;33m'; CYAN='\033[0;36m'; GREEN='\033[0;32m'; RESET='\033[0m'

prefix() { local color="$1" label="$2"; shift 2; "$@" 2>&1 | sed "s/^/$(printf "${color}[${label}]${RESET} ")/"; }

# Kill all background jobs on Ctrl+C
cleanup() {
  echo -e "\n${RED}Stopping all services...${RESET}"
  kill 0
}
trap cleanup INT TERM

echo -e "${GREEN}Starting Conduit dev environment...${RESET}"

prefix "$RED"    "backend"        bash -c "cd '$ROOT/conduitb' && python main.py" &
prefix "$YELLOW" "customer-agent" bash -c "cd '$ROOT/lk-agents/customer-agent' && uv run src/agent.py dev" &
prefix "$CYAN"   "coach-agent"    bash -c "cd '$ROOT/lk-agents/coach-agent'    && uv run src/agent.py dev" &
prefix "$GREEN"  "frontend"       bash -c "cd '$ROOT/conduitc' && npm run dev" &

wait
