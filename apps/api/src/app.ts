/**
 * Fastify application setup
 */

import Fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { Server } from 'socket.io';
import config from './config';
import { authRoutes } from './modules/auth';
import { healthRoutes } from './modules/health/health.routes';
import { setupSockets } from './sockets';

export async function createApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  // Register plugins
  app.register(fastifyHelmet);
  app.register(fastifyCors, {
    origin: config.CORS_ORIGIN,
    credentials: true,
  });
  app.register(fastifyJwt, {
    secret: config.JWT_SECRET,
  });
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  // Health routes
  app.register(healthRoutes);

  // API routes with /api/v1 prefix
  app.register(
    async (fastify) => {
      await authRoutes(fastify);
    },
    { prefix: '/api/v1' }
  );

  // Setup Socket.io
  const io = new Server(app.server, {
    cors: {
      origin: config.CORS_ORIGIN,
      credentials: true,
    },
  });

  setupSockets(app, io);

  // Type augmentation for request
  app.addHook('preHandler', (request, reply, done) => {
    (request as any).user = null;
    done();
  });

  return app;
}
