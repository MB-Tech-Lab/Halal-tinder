/**
 * Notification queue
 */

import { Queue } from 'bullmq';
import { redisClient } from '../../lib/redis';

export const notificationQueue = new Queue('notifications', {
  connection: redisClient,
});

notificationQueue.process(async (job) => {
  console.log(`Processing notification job: ${job.id}`);
  console.log(job.data);
  // Send notification logic here
  return { success: true };
});

notificationQueue.on('completed', (job) => {
  console.log(`Notification job ${job.id} completed`);
});

notificationQueue.on('failed', (job, err) => {
  console.log(`Notification job ${job?.id} failed:`, err.message);
});
