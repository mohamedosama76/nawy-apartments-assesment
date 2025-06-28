FROM node:18-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies first (including dev dependencies)
COPY package.json ./
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --prod

EXPOSE 3000

# Start command in production mode
CMD ["pnpm", "start"] 