/**
 * Fastify server entry point
 */

import { createApp } from './app';
import config from './config';
import { connectRedis } from './lib/redis';
import { prisma } from './lib/prisma';

async function main() {
  try {
    console.log('Starting Halal Tinder API...');

    // Connect to Redis
    await connectRedis();
    console.log('✓ Redis connected');

    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✓ Database connected');

    // Create and start app
    const app = await createApp();

    await app.listen({ port: config.PORT, host: config.HOST });

    console.log(`✓ Server running on http://${config.HOST}:${config.PORT}`);
    console.log(`✓ API available at http://${config.HOST}:${config.PORT}/api/v1`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
