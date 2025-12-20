#!/bin/bash
# FxWealth full start script for Termux

# 1. Kill any Node process using port 5000
echo "Killing old Node processes on port 5000..."
kill -9 $(lsof -t -i:5000) 2>/dev/null

# 2. Set environment variables (from .env)
export $(grep -v '^#' .env | xargs)

# 3. Install frontend dependencies (optional, only if not done)
echo "Installing frontend dependencies..."
cd frontend
npm install

# 4. Build frontend
echo "Building frontend..."
npm run build

# 5. Go back to root
cd ..

# 6. Install backend dependencies (optional, only if not done)
echo "Installing backend dependencies..."
npm install

# 7. Start server
echo "Starting FxWealth server..."
node server.js
