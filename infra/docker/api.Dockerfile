# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build API
RUN cd apps/api && pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies only
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Copy built app from builder
COPY --from=builder /app/apps/api/dist /app/dist
COPY --from=builder /app/apps/api/prisma /app/prisma
COPY --from=builder /app/node_modules /app/node_modules

# Run Prisma migrations and start server
CMD ["pnpm", "start"]
