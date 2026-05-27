/**
 * Email queue for sending emails
 */

import { Queue } from 'bullmq';
import { redisClient } from '../../lib/redis';

export const emailQueue = new Queue('email', {
  connection: redisClient,
});

emailQueue.process(async (job) => {
  console.log(`Processing email job: ${job.id}`);
  console.log(job.data);
  // Send email logic here
  return { success: true };
});

emailQueue.on('completed', (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  console.log(`Email job ${job?.id} failed:`, err.message);
});
