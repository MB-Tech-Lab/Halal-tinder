/**
 * API service for matches
 */

import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
});

export const matchesService = {
  getMatches: async (page: number = 1, limit: number = 20) => {
    const response = await api.get('/matches', {
      params: { page, limit }
    });
    return response.data.data;
  },

  likeProfile: async (userId: string) => {
    const response = await api.post(`/matches/${userId}/like`);
    return response.data.data;
  },

  passProfile: async (userId: string) => {
    const response = await api.post(`/matches/${userId}/pass`);
    return response.data.data;
  },

  blockProfile: async (userId: string) => {
    const response = await api.post(`/matches/${userId}/block`);
    return response.data.data;
  },
};
