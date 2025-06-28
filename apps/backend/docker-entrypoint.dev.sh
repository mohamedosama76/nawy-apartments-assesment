#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
pnpm prisma migrate deploy
pnpm prisma db seed

# Start development server
echo "Starting development server..."
pnpm dev
