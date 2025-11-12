#!/bin/bash
set -e

# Start FastAPI backend in background
cd /app/fastapi
uvicorn main:app --host 0.0.0.0 --port 8000 &

# Start Node backend (it will serve APIs and React build)
cd /app/backend

# Optional: Serve React build through Express (if configured)
# If not, Node will just serve APIs on port 5002
node server.js
