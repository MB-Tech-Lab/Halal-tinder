/**
 * Auth module controller
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import { authService } from './auth.service';
import { RegisterInput, LoginInput } from '@halal-tinder/validation';

export class AuthController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as RegisterInput;
    const result = await authService.register(data);
    return reply.code(201).send({
      success: true,
      data: result,
    });
  }

  static async login(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as LoginInput;
    const result = await authService.login(data);
    return reply.send({
      success: true,
      data: result,
    });
  }

  static async refresh(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = request.body as { refreshToken: string };
    const result = await authService.refreshToken(refreshToken);
    return reply.send({
      success: true,
      data: result,
    });
  }

  static async logout(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({
      success: true,
      message: 'Logged out successfully',
    });
  }
}
