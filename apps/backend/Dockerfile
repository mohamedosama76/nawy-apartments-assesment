FROM node:18-alpine

WORKDIR /app

# Install system dependencies including OpenSSL
RUN apk add --no-cache openssl libc6-compat

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies first
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies (including dev dependencies)
RUN pnpm install --no-frozen-lockfile

# Generate Prisma client
RUN pnpm prisma generate

# Copy the rest of the application
COPY . .

# Regenerate Prisma client with the latest schema
RUN pnpm prisma generate

# Build TypeScript code
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --prod

EXPOSE 4000

# Create startup script
COPY <<EOF /docker-entrypoint.sh
#!/bin/sh
# Ensure Prisma client is available
if [ ! -d "/app/node_modules/.prisma" ]; then
  echo "Regenerating Prisma client..."
  pnpm prisma generate
fi

# Run migrations and start the application
pnpm prisma migrate deploy && pnpm prisma db seed && node dist/index.js
EOF

RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
