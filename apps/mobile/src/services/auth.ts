/**
 * API service for authentication
 */

import axios from 'axios';
import { LoginInput, RegisterInput } from '@halal-tinder/validation';
import { AuthTokens } from '@halal-tinder/shared';
import config from '../config';

const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
});

export const authService = {
  register: async (data: RegisterInput): Promise<AuthTokens> => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },

  login: async (data: LoginInput): Promise<AuthTokens> => {
    const response = await api.post('/auth/login', data);
    return response.data.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
