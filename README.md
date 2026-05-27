# Halal Tinder - Matrimony Platform

A production-grade monorepo for a halal matrimony mobile application designed for the Dawoodi Bohra community.

## 🏗️ Architecture

This is a **monorepo** containing multiple apps and shared packages using **pnpm workspaces** and **Turborepo**.

### Structure

```
Halal-tinder/
├── apps/
│   ├── mobile/      # React Native + Expo mobile app
│   └── api/         # Fastify + Node.js backend
├── packages/
│   ├── shared/      # Shared types, interfaces, enums
│   ├── validation/  # Zod validation schemas
│   ├── config/      # ESLint, Prettier, TypeScript configs
│   └── ui/          # Reusable React Native components
├── infra/           # Docker, scripts
└── docs/            # Documentation
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 10+
- Docker & Docker Compose (for local PostgreSQL & Redis)

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start Docker services (PostgreSQL, Redis)
docker-compose -f infra/docker/docker-compose.yml up -d

# Setup database
pnpm db:generate
pnpm db:migrate

# Run all apps in development mode
pnpm dev
```

### Development Commands

```bash
# Run all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Type check all apps
pnpm type-check

# Clean build artifacts
pnpm clean

# Database migrations
pnpm db:migrate
pnpm db:generate
pnpm db:seed
```

## 📱 Mobile App (`apps/mobile`)

React Native + Expo frontend for iOS and Android.

**Tech Stack:**
- React Native
- Expo
- TypeScript
- Zustand (state management)
- React Query (data fetching)
- Axios (HTTP client)
- Zod (validation)
- React Hook Form
- Socket.io-client (realtime)

**Run Development:**
```bash
cd apps/mobile
pnpm dev
```

[📖 Mobile App Docs](apps/mobile/README.md)

## 🖥️ Backend API (`apps/api`)

Fastify REST API with modular architecture.

**Tech Stack:**
- Fastify
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Redis
- BullMQ (job queues)
- Socket.io (websockets)
- JWT (authentication)

**Run Development:**
```bash
cd apps/api
pnpm dev
```

[📖 Backend API Docs](apps/api/README.md)

## 📦 Shared Packages

### `@halal-tinder/shared`
Shared types, interfaces, enums, and constants used across frontend and backend.

### `@halal-tinder/validation`
Zod schemas for validation shared between frontend and backend.

### `@halal-tinder/config`
Shared ESLint, Prettier, and TypeScript configurations.

### `@halal-tinder/ui`
Reusable React Native components library.

## 🔌 Key Features

### Backend Modules

- **Auth Module**: Registration, login, JWT tokens, refresh tokens
- **Users Module**: User management, roles, permissions
- **Profiles Module**: Profile management, photos, preferences
- **Matches Module**: Matching algorithm, match management
- **Chat Module**: Direct messaging with real-time updates
- **Notifications Module**: Push notifications, email notifications
- **Moderation Module**: User moderation, reporting, safety
- **Admin Module**: Admin dashboard, analytics

### API Endpoints

All endpoints are versioned with `/api/v1` prefix:

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/users
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
GET    /api/v1/matches
POST   /api/v1/matches/:id/like
POST   /api/v1/matches/:id/pass
... (more endpoints)
```

### WebSocket Events

- `message:new` - New message received
- `typing:start` - User started typing
- `typing:stop` - User stopped typing
- `presence:online` - User came online
- `presence:offline` - User went offline

### Job Queues

- **Email Queue**: Send verification emails, password resets
- **Notification Queue**: Push notifications, system alerts
- **Image Processing Queue**: Image optimization, thumbnail generation
- **Cleanup Queue**: Scheduled cleanup tasks

## 🗄️ Database

PostgreSQL with Prisma ORM.

### Models

- User
- Profile
- Match
- Conversation
- Message
- Notification
- Report
- Admin
- Settings

### Migrations

```bash
# Create new migration
pnpm db:migrate

# Generate Prisma client
pnpm db:generate

# Seed database with initial data
pnpm db:seed
```

## 🚀 Docker Deployment

### Local Development

```bash
docker-compose -f infra/docker/docker-compose.yml up -d
```

### Services

- **PostgreSQL**: Database (port 5432)
- **Redis**: Cache & queues (port 6379)
- **API**: Fastify server (port 3000)

## 🔒 Security

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **CORS**: Configured CORS policies
- **Rate Limiting**: Request rate limiting
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Prisma parameterized queries

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 📝 Code Quality

### ESLint

```bash
pnpm lint
```

### Prettier

```bash
pnpm format
```

### TypeScript

```bash
pnpm type-check
```

## 🌐 Environment Variables

See [.env.example](.env.example) for all available environment variables.

### Required Variables

```env
DATABASE_URL        # PostgreSQL connection string
REDIS_URL          # Redis connection string
JWT_SECRET         # Secret key for JWT signing
API_PORT           # API server port
EXPO_PUBLIC_API_URL # Frontend API base URL
```

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [Backend API Documentation](apps/api/README.md)
- [Mobile App Documentation](apps/mobile/README.md)
- [Deployment Guide](docs/deployment.md) (coming soon)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass and linting passes
4. Submit a pull request

## 📄 License

See [LICENSE](LICENSE) file

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ for the Dawoodi Bohra community**