/**
 * Cleanup queue
 */

import { Queue } from 'bullmq';
import { redisClient } from '../../lib/redis';

export const cleanupQueue = new Queue('cleanup', {
  connection: redisClient,
});

cleanupQueue.process(async (job) => {
  console.log(`Processing cleanup job: ${job.id}`);
  console.log(job.data);
  // Cleanup logic here
  return { success: true };
});

cleanupQueue.on('completed', (job) => {
  console.log(`Cleanup job ${job.id} completed`);
});

cleanupQueue.on('failed', (job, err) => {
  console.log(`Cleanup job ${job?.id} failed:`, err.message);
});
