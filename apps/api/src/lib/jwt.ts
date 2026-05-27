/**
 * JWT utilities
 */

import jwt from 'jsonwebtoken';
import config from '../config';
import { JwtPayload } from '@halal-tinder/shared';

export const generateAccessToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { userId, email, role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRATION }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRATION }
  );
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
