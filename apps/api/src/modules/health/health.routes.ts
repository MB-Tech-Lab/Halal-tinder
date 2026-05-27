/**
 * Health check routes for API monitoring
 */

import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { redisClient } from '../lib/redis';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async (request, reply) => {
    try {
      // Check database
      await prisma.$queryRaw`SELECT 1`;

      // Check Redis
      await redisClient.ping();

      return {
        success: true,
        status: 'healthy',
        timestamp: new Date(),
        services: {
          database: 'connected',
          redis: 'connected',
        },
      };
    } catch (error) {
      return reply.code(503).send({
        success: false,
        status: 'unhealthy',
        timestamp: new Date(),
        error: 'Service health check failed',
      });
    }
  });

  app.get('/health/ready', async (request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      await redisClient.ping();
      return reply.send({ ready: true });
    } catch (error) {
      return reply.code(503).send({ ready: false });
    }
  });
}
