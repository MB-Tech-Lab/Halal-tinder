# Halal Tinder Backend API

Fastify REST API backend with modular architecture, PostgreSQL, Redis, and BullMQ.

## Quick Start

```bash
pnpm install

# Setup environment
cp .env.example .env

# Start Docker services
docker-compose -f ../../infra/docker/docker-compose.yml up -d

# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Start development server
pnpm dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Health
- `GET /health` - Health check
- `GET /health/ready` - Readiness check

## Architecture

### Folder Structure

```
src/
├── config/              # Configuration
├── lib/                 # Libraries (Prisma, Redis, JWT, etc.)
├── middleware/          # Middleware (auth, etc.)
├── modules/             # Feature modules
│   ├── auth/           # Authentication
│   ├── users/          # Users management
│   ├── profiles/       # User profiles
│   ├── matches/        # Matching
│   ├── chat/           # Chat/messaging
│   ├── notifications/  # Notifications
│   ├── moderation/     # Moderation
│   └── admin/          # Admin features
├── queues/             # BullMQ job queues
├── sockets/            # Socket.io setup
├── utils/              # Utilities
├── app.ts              # App setup
└── server.ts           # Server entry point
```

### Module Structure

Each module follows this pattern:

```
module-name/
├── module.controller.ts    # HTTP handlers
├── module.service.ts       # Business logic
├── module.routes.ts        # Route definitions
├── module.schema.ts        # Request/response schemas
├── module.types.ts         # TypeScript types
└── index.ts               # Module export
```

## Database

### Prisma ORM

- **Provider**: PostgreSQL
- **Migrations**: `prisma/migrations/`
- **Schema**: `prisma/schema.prisma`
- **Seed**: `prisma/seed.ts`

### Commands

```bash
# Create migration
pnpm db:migrate

# Generate Prisma client
pnpm db:generate

# Seed database
pnpm db:seed

# Open Prisma Studio
pnpm prisma studio
```

## Redis & Queues

Uses BullMQ for job queue processing:

- **Email Queue**: `emailQueue`
- **Notification Queue**: `notificationQueue`
- **Image Processing**: `imageProcessingQueue`
- **Cleanup**: `cleanupQueue`

## WebSocket

Socket.io for real-time communication:

- `message:send` - Send message
- `typing:start` - User typing
- `typing:stop` - Stopped typing
- `presence:online` - User online
- `presence:offline` - User offline

## Authentication

JWT-based authentication:

- **Access Token**: 7 days
- **Refresh Token**: 30 days
- **Secret**: `JWT_SECRET` env variable

Protected routes use middleware:

```typescript
app.post('/protected', { onRequest: [authenticateToken] }, handler);
```

## Error Handling

Uses custom `AppError` class:

```typescript
throw new AppError(400, 'User not found', 'USER_NOT_FOUND');
```

## Development

```bash
# Start dev server (with hot reload)
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Clean
pnpm clean
```

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

See `.env.example` for all required variables.

## Testing

Testing setup coming soon.

## Documentation

- [Architecture Overview](../../docs/architecture.md)
- [Monorepo Root](../../README.md)
