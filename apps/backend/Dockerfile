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

# Copy the entrypoint script first
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy the rest of the application
COPY . .

# Regenerate Prisma client with the latest schema
RUN pnpm prisma generate

# Build TypeScript code
RUN pnpm build

# Keep Prisma CLI while removing other dev dependencies
RUN pnpm install prisma --save-dev && pnpm prune --prod && pnpm install prisma --save-dev

EXPOSE 4000

CMD ["/docker-entrypoint.sh"]
