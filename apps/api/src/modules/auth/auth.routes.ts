/**
 * Auth module routes
 */

import { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema } from '@halal-tinder/validation';
import { AuthController } from './auth.controller';

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: any }>(
    '/auth/register',
    {
      schema: {
        body: registerSchema,
      },
    },
    AuthController.register
  );

  app.post<{ Body: any }>(
    '/auth/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    AuthController.login
  );

  app.post('/auth/refresh', AuthController.refresh);
  app.post('/auth/logout', AuthController.logout);
}
