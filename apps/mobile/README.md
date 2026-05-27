/**
 * Mobile app README
 */

# Halal Tinder Mobile App

React Native + Expo mobile application for iOS and Android.

## Setup

```bash
pnpm install
pnpm dev
```

## Project Structure

```
src/
├── assets/          # Images, fonts, icons
├── components/      # Reusable components
├── constants/       # App constants
├── hooks/          # Custom React hooks
├── navigation/     # React Navigation setup
├── screens/        # Screen components
├── services/       # API services
├── store/          # Zustand state management
├── styles/         # Shared styles
├── types/          # TypeScript types
├── utils/          # Utility functions
├── config/         # App configuration
└── lib/            # Libraries and helpers
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm type-check` - Run TypeScript type checker
- `pnpm lint` - Run ESLint

## Features

- Authentication (Register, Login)
- Browse Profiles
- Matching System
- Real-time Chat
- Notifications
- User Profile Management

## Dependencies

- **React Native** - Native mobile framework
- **Expo** - Development platform
- **Zustand** - State management
- **React Query** - Data fetching & caching
- **Axios** - HTTP client
- **Zod** - Validation
- **Socket.io-client** - Real-time communication

## State Management

Uses Zustand for simple, performant state management:

```typescript
import { useAuthStore } from '@/store';

const auth = useAuthStore();
```

## API Integration

API services are in `src/services/`:

```typescript
import { authService } from '@/services';

const tokens = await authService.login(credentials);
```

## Type Safety

Full TypeScript support with strict mode enabled.

## Getting Help

See the root README for monorepo-wide documentation.
