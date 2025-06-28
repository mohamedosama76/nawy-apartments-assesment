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

# Wait for database, run migrations, seed the database, then start
CMD ["/bin/sh", "-c", "pnpm prisma migrate deploy && pnpm prisma db seed && node dist/index.js"]
