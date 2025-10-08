#!/bin/bash

APP_DIR=~/aadaar_ocr_system/server
PROJECT_NAME=aadaar_ocr_system

echo "📦 Switching to app directory: $APP_DIR"
cd $APP_DIR || { echo "❌ Directory not found"; exit 1; }

echo "🧹 Stopping old containers for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME down

echo "🧽 Cleaning up unused Docker resources (not affecting other projects)..."
docker system prune -af --volumes

echo "🐳 Pulling latest Docker images for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME pull

echo "🚀 Restarting Docker containers for project: $PROJECT_NAME..."
docker compose -p $PROJECT_NAME up -d

echo "✅ Deployment complete."
