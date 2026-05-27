# Halal Tinder - Monorepo Architecture & Setup Plan

## Goal

Create a production-grade monorepo architecture for a halal matrimony mobile application for the Dawoodi Bohra community.

The project must include:

* React Native + Expo frontend
* Node.js + Fastify backend
* PostgreSQL database
* Prisma ORM
* Redis
* BullMQ queues
* TypeScript everywhere
* Shared packages between frontend/backend
* pnpm workspaces
* Turborepo monorepo
* Scalable modular architecture

---

# 1. Convert Repository Into Monorepo

Current structure:

/frontend
/backend

Replace with:

```txt
/apps/mobile
/apps/api
/packages/shared
/packages/validation
/packages/config
/packages/ui
/docs
/infra
```

---

# 2. Root Monorepo Setup

## Install Required Global Dependencies

Use:

* pnpm
* turbo

Commands:

```bash
npm install -g pnpm
pnpm add -g turbo
```

---

# 3. Root Folder Structure

Create this structure:

```txt
Halal-tinder/
│
├── apps/
│   ├── mobile/
│   └── api/
│
├── packages/
│   ├── shared/
│   ├── validation/
│   ├── config/
│   └── ui/
│
├── docs/
│
├── infra/
│   ├── docker/
│   ├── nginx/
│   └── scripts/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .gitignore
├── .env.example
├── README.md
└── LICENSE
```

---

# 4. Root package.json

Create root package.json:

```json
{
  "name": "halal-tinder",
  "private": true,
  "packageManager": "pnpm@10",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

# 5. pnpm Workspace Setup

Create:

pnpm-workspace.yaml

```yaml
packages:
  - apps/*
  - packages/*
```

---

# 6. Turborepo Setup

Create:

turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {},
    "clean": {
      "cache": false
    }
  }
}
```

---

# 7. Shared TypeScript Config

Create:

tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": "."
  }
}
```

---

# 8. Frontend Setup (Expo App)

Create app:

/apps/mobile

Initialize using Expo TypeScript template.

Install:

* expo
* react-native
* react-navigation
* react-query
* axios
* zustand
* zod
* react-hook-form
* socket.io-client

Recommended structure:

```txt
/apps/mobile/src
│
├── assets/
├── components/
├── constants/
├── hooks/
├── navigation/
├── screens/
├── services/
├── store/
├── styles/
├── types/
├── utils/
└── lib/
```

Create screens:

```txt
screens/
├── auth/
├── onboarding/
├── home/
├── matches/
├── chat/
├── profile/
└── settings/
```

---

# 9. Backend Setup (Fastify API)

Create app:

/apps/api

Install:

* fastify
* @fastify/cors
* @fastify/jwt
* @fastify/multipart
* prisma
* @prisma/client
* redis
* bullmq
* zod
* bcrypt
* socket.io
* dotenv

Dev dependencies:

* typescript
* tsx
* nodemon
* eslint
* prettier

---

# 10. Backend Folder Structure

```txt
/apps/api/src
│
├── config/
├── lib/
├── middleware/
├── modules/
├── queues/
├── prisma/
├── plugins/
├── sockets/
├── utils/
├── app.ts
└── server.ts
```

---

# 11. Backend Modules Structure

Each module must follow this structure:

```txt
modules/auth/
│
├── auth.controller.ts
├── auth.service.ts
├── auth.routes.ts
├── auth.schema.ts
├── auth.types.ts
└── index.ts
```

Create modules:

```txt
modules/
├── auth/
├── users/
├── profiles/
├── matches/
├── chat/
├── notifications/
├── moderation/
└── admin/
```

---

# 12. Prisma Setup

Create:

/apps/api/prisma

Structure:

```txt
prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

Initial models:

* User
* Profile
* Match
* Conversation
* Message
* Notification
* Report

Use PostgreSQL provider.

---

# 13. Redis & BullMQ

Create:

```txt
queues/
├── email.queue.ts
├── notification.queue.ts
├── image-processing.queue.ts
└── cleanup.queue.ts
```

Redis should be used for:

* queues
* caching
* OTP storage
* websocket scaling
* rate limiting
* session cache

Do NOT store permanent chat messages in Redis.

Permanent messages must remain in PostgreSQL.

---

# 14. Shared Packages

## /packages/shared

Purpose:

* shared interfaces
* DTOs
* enums
* constants

Structure:

```txt
shared/
├── src/
│   ├── types/
│   ├── enums/
│   ├── constants/
│   └── index.ts
```

Example:

```ts
export interface UserProfile {
  id: string;
  name: string;
  age: number;
}
```

---

# 15. Validation Package

## /packages/validation

Use Zod schemas shared between frontend/backend.

Structure:

```txt
validation/
├── src/
│   ├── auth/
│   ├── profile/
│   ├── match/
│   └── index.ts
```

Example:

```ts
export const registerSchema = z.object({
  name: z.string(),
  age: z.number().min(18)
});
```

---

# 16. Config Package

## /packages/config

Shared configs:

* eslint
* prettier
* tsconfig

---

# 17. UI Package

## /packages/ui

Optional reusable React Native components later.

Examples:

* buttons
* cards
* typography
* modal
* loaders

---

# 18. Environment Variables

Create root:

.env.example

Include:

```env
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
EXPO_PUBLIC_API_URL=
```

---

# 19. Docker Setup

Create:

```txt
infra/docker/
├── docker-compose.yml
├── api.Dockerfile
└── postgres/
```

Docker compose services:

* postgres
* redis
* api

---

# 20. GitHub Actions

Create CI workflow:

.github/workflows/ci.yml

Pipeline should:

* install dependencies
* lint
* typecheck
* build
* run tests

---

# 21. API Design Rules

Use:

* REST API
* versioned routes

Example:

```txt
/api/v1/auth/register
/api/v1/auth/login
/api/v1/users
/api/v1/matches
```

---

# 22. Authentication Strategy

Use:

* JWT access token
* refresh token
* OTP login later

Features:

* role-based auth
* admin auth
* protected routes

---

# 23. Realtime Chat

Use:

* socket.io

Features:

* realtime messages
* typing indicators
* online presence
* read receipts

Redis adapter later for scaling.

---

# 24. Code Standards

Requirements:

* strict TypeScript
* modular architecture
* avoid circular dependencies
* reusable utilities
* service layer abstraction
* no business logic inside controllers

---

# 25. Future Scalability

Architecture must support future additions:

* AI matchmaking
* recommendation engine
* video profiles
* community verification
* family-managed accounts
* premium subscriptions
* multilingual support

---

# 26. Important Development Rules

* Use TypeScript everywhere
* Keep backend modular
* Shared validation must live in packages
* Shared types must live in packages
* Use Prisma migrations
* Keep secrets in env files only
* Use ESLint + Prettier
* Never hardcode URLs
* Keep reusable logic centralized

---

# Final Objective

Create a clean, scalable, production-grade monorepo architecture optimized for:

* mobile-first development
* realtime communication
* matchmaking workflows
* modular scaling
* developer productivity
* shared frontend/backend contracts

```
```
