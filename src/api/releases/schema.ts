import { FastifySchema } from 'fastify';

export const getReleasesSchema: FastifySchema = {
  description: 'Route to get releases',
  tags: ['Releases'],
  summary: 'Get releases',
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          createdAt: { type: 'string' },
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

export const getReleaseWithChangelogsSchema: FastifySchema = {
  description: 'Route to get a release with changelogs',
  tags: ['Releases'],
  summary: 'Get a release with changelogs',
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
        title: { type: 'string' },
        createdAt: { type: 'string' },
        changelogs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              releaseId: { type: 'number' },
              author: { type: 'string' },
              project: { type: 'string' },
              createdAt: { type: 'string' },
            },
          },
        },
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

export const postReleaseSchema: FastifySchema = {
  description: 'Route to post a release',
  tags: ['Releases'],
  summary: 'Post a release',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
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
