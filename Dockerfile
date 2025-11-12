# ===== STAGE 1: Build React (Vite) frontend =====
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend-react/package*.json ./
RUN npm install
COPY frontend-react/ .
RUN npm run build

# ===== STAGE 2: Build Node backend =====
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend-node/package*.json ./
RUN npm install
COPY backend-node/ .

# ===== STAGE 3: Build FastAPI service =====
FROM python:3.11 AS fastapi
WORKDIR /app/fastapi
COPY fastapi/ .
RUN pip install --no-cache-dir -r requirements.txt

# ===== FINAL STAGE: Combine everything =====
FROM python:3.11

# Install Node + npm in the Python image for convenience
RUN apt-get update && apt-get install -y nodejs npm

# Copy all apps
WORKDIR /app
COPY --from=frontend /app/frontend/dist ./frontend
COPY --from=backend /app/backend ./backend
COPY --from=fastapi /app/fastapi ./fastapi

# Install backend dependencies again (runtime)
WORKDIR /app/backend
RUN npm install --omit=dev

# Install FastAPI dependencies
WORKDIR /app/fastapi
RUN pip install --no-cache-dir -r requirements.txt

# Expose ports
EXPOSE 3000 5002 8000

# ===== Start all 3 together =====
WORKDIR /app
COPY start.sh .
RUN chmod +x start.sh
CMD ["./start.sh"]
