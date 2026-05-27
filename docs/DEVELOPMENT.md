# Monorepo Development Guide

## Setup Instructions

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- pnpm 10+ (`npm install -g pnpm`)
- Docker & Docker Compose ([Download](https://www.docker.com/))
- Git

### First Time Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd Halal-tinder

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start Docker services
docker-compose -f infra/docker/docker-compose.yml up -d

# 5. Generate Prisma client
pnpm db:generate

# 6. Run database migrations
pnpm db:migrate

# 7. Seed database (optional)
pnpm db:seed

# 8. Start development servers
pnpm dev
```

## Development Workflow

### Running Applications

**Run all apps:**
```bash
pnpm dev
```

**Run specific app:**
```bash
cd apps/mobile && pnpm dev
cd apps/api && pnpm dev
```

### Database Operations

```bash
# Create new migration
pnpm db:migrate -- --name add_new_table

# Open Prisma Studio
cd apps/api && pnpm prisma studio

# Seed database
pnpm db:seed

# Reset database (development only)
cd apps/api && pnpm prisma migrate reset
```

### Code Quality

```bash
# Lint all code
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format

# Build all apps
pnpm build
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## Project Structure

```
Halal-tinder/
├── apps/
│   ├── mobile/         # React Native + Expo
│   └── api/            # Fastify backend
├── packages/
│   ├── shared/         # Shared types
│   ├── validation/     # Zod schemas
│   ├── config/         # Shared configs
│   └── ui/             # UI components
├── infra/
│   └── docker/         # Docker setup
├── .github/
│   └── workflows/      # CI/CD
├── docs/               # Documentation
└── [config files]
```

## Common Commands

```bash
# Install dependencies
pnpm install

# Add dependency to specific workspace
pnpm add lodash --filter @halal-tinder/shared

# Run script in specific workspace
pnpm --filter apps/api type-check

# Clean all builds
pnpm clean

# View Turborepo graph
pnpm build -- --graph

# Format all files
pnpm format
```

## Git Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am "feat: add new feature"`
3. Push: `git push origin feature/my-feature`
4. Create Pull Request

## Environment Variables

See [.env.example](.env.example) for all available variables.

**Required for development:**
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `JWT_SECRET` - JWT signing key

## Docker Management

```bash
# Start services
docker-compose -f infra/docker/docker-compose.yml up -d

# Stop services
docker-compose -f infra/docker/docker-compose.yml down

# View logs
docker-compose -f infra/docker/docker-compose.yml logs -f

# Rebuild services
docker-compose -f infra/docker/docker-compose.yml build --no-cache
```

## Troubleshooting

### Port already in use
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database connection error
```bash
# Check PostgreSQL is running
docker-compose -f infra/docker/docker-compose.yml ps
# Reset database
cd apps/api && pnpm prisma migrate reset
```

### pnpm dependency issues
```bash
# Clear cache
pnpm store prune
# Reinstall
pnpm install
```

## IDE Setup

### VS Code

Recommended extensions:
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Prisma
- Thunder Client (for API testing)

**Workspace Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Performance Tips

- Use `pnpm --filter` to run tasks only in affected packages
- Cache dependencies between CI runs
- Use Turborepo's caching for builds
- Split large screens into smaller components

## Contributing

1. Follow the code standards (see Code Standards below)
2. Write tests for new features
3. Update documentation
4. Request review from team

## Code Standards

- **Language**: TypeScript (strict mode)
- **Formatting**: Prettier
- **Linting**: ESLint
- **Imports**: Use absolute paths with aliases
- **Components**: Functional components with hooks
- **Error Handling**: Use custom AppError class

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Fastify Documentation](https://www.fastify.io/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)

## Getting Help

- Check existing issues and discussions
- Ask in team Slack/Discord channel
- Open a new issue with detailed description

---

Happy coding! 🚀
