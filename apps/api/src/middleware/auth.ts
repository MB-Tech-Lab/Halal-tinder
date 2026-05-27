/**
 * Auth middleware for JWT verification
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../lib/jwt';
import { AppError } from '../lib/errors';

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'Missing authentication token', 'MISSING_TOKEN');
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw new AppError(401, 'Invalid or expired token', 'INVALID_TOKEN');
    }

    request.user = payload;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(401, 'Unauthorized', 'UNAUTHORIZED');
  }
}

export async function optionalAuthToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        request.user = payload;
      }
    }
  } catch (error) {
    // Ignore errors for optional auth
  }
}
