/**
 * Image processing queue
 */

import { Queue } from 'bullmq';
import { redisClient } from '../../lib/redis';

export const imageProcessingQueue = new Queue('image-processing', {
  connection: redisClient,
});

imageProcessingQueue.process(async (job) => {
  console.log(`Processing image job: ${job.id}`);
  console.log(job.data);
  // Image processing logic here
  return { success: true };
});

imageProcessingQueue.on('completed', (job) => {
  console.log(`Image job ${job.id} completed`);
});

imageProcessingQueue.on('failed', (job, err) => {
  console.log(`Image job ${job?.id} failed:`, err.message);
});
