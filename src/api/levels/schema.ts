import { FastifySchema } from 'fastify';

export const getOneLevelSchema: FastifySchema = {
  description: 'Route to get a level',
  tags: ['Levels'],
  summary: 'Get a level',
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Successful response',
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
    400: {
      description: 'Bad request',
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
};

export const postLevelSchema: FastifySchema = {
  description: 'Route to post a level with admin role',
  tags: ['Levels'],
  summary: 'Post a level with admin role',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      reward: { type: 'string' },
      data: { type: 'string' },
      worldId: { type: 'number' },
      type: { type: 'string' },
    },
    required: ['name', 'reward', 'data', 'worldId', 'type'],
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
