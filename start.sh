#!/bin/bash
# Start FastAPI in background
cd /app/fastapi && uvicorn main:app --host 0.0.0.0 --port 8000 &

# Start Node backend
cd /app/backend && node server.js
