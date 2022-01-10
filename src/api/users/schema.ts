import { FastifySchema } from 'fastify';

const meSchema: FastifySchema = {
  description: 'Route to get user',
  tags: ['Users'],
  summary: 'User Profile',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        roles: { type: 'array' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        type: { type: 'number' },
        key: { type: 'string' },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        type: { type: 'number' },
        key: { type: 'string' },
      },
    },
    404: {
      description: 'Not found',
      type: 'object',
      properties: {
        type: { type: 'number' },
        key: { type: 'string' },
      },
    },
    500: {
      description: 'Internal Server Error',
      type: 'object',
      properties: {
        type: { type: 'number' },
        key: { type: 'string' },
      },
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
};

export default meSchema;
