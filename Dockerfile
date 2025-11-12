# ===============================================================
# STAGE 1: Build React (Vite) frontend
# ===============================================================
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend-react/package*.json ./
RUN npm install
COPY frontend-react/ .
RUN npm run build

# ===============================================================
# STAGE 2: Build Node backend
# ===============================================================
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend-node/package*.json ./
RUN npm install
COPY backend-node/ .

# ===============================================================
# STAGE 3: Build FastAPI backend
# ===============================================================
FROM python:3.11-slim AS fastapi
WORKDIR /app/fastapi
COPY fastapi/ .
RUN pip install --no-cache-dir -r requirements.txt

# ===============================================================
# STAGE 4: Final runtime container (combined environment)
# ===============================================================
FROM python:3.11-slim

# Install Node.js and Nginx in Python image
RUN apt-get update && apt-get install -y nodejs npm nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy build artifacts from previous stages
COPY --from=frontend /app/frontend/dist ./frontend
COPY --from=backend /app/backend ./backend
COPY --from=fastapi /app/fastapi ./fastapi

# Copy start script
COPY start.sh .
RUN chmod +x start.sh

# Expose all relevant ports
EXPOSE 80 5002 8000

# Default command
CMD ["./start.sh"]
