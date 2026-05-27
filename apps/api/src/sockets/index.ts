/**
 * Socket.io setup for real-time communication
 */

import { Server } from 'socket.io';
import { FastifyInstance } from 'fastify';

export function setupSockets(app: FastifyInstance, io: Server) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Message events
    socket.on('message:send', (data) => {
      console.log('Message sent:', data);
      io.emit('message:received', data);
    });

    socket.on('typing:start', (data) => {
      socket.broadcast.emit('typing:start', data);
    });

    socket.on('typing:stop', (data) => {
      socket.broadcast.emit('typing:stop', data);
    });

    // Presence events
    socket.on('presence:online', (userId: string) => {
      socket.broadcast.emit('presence:online', { userId });
    });

    socket.on('presence:offline', (userId: string) => {
      socket.broadcast.emit('presence:offline', { userId });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
