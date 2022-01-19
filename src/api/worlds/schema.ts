import { FastifySchema } from 'fastify';

export const getAllWorldsSchema: FastifySchema = {
  description: 'Route to get all worlds',
  tags: ['Worlds'],
  summary: 'Get all worlds',
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          value: { type: 'number' },
          levels: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                reward: { type: 'string' },
                worldId: { type: 'number' },
                data: {},
                type: { type: 'string' },
              },
            },
          },
        },
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
};

export const postWorldSchema: FastifySchema = {
  description: 'Route to post a world with admin role',
  tags: ['Worlds'],
  summary: 'Post a world with admin role',
  body: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        value: { type: 'number' },
      },
      required: ['name', 'value'],
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        ok: { type: 'boolean' },
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
