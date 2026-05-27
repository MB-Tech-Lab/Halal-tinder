/**
 * Redis client instance
 */

import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});

export const connectRedis = async () => {
  await redisClient.connect();
};

export default redisClient;
