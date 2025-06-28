#!/bin/sh
# Ensure Prisma client is available
if [ ! -d "/app/node_modules/.prisma" ]; then
  echo "Regenerating Prisma client..."
  pnpm prisma generate
fi

# Run migrations and start the application
pnpm prisma migrate deploy && pnpm prisma db seed && node dist/index.js 