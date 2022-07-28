import { FastifySchema } from 'fastify';

const postChangelogSchema: FastifySchema = {
  description: 'Route to post a changelog',
  tags: ['Changelogs'],
  summary: 'Post a changelog',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      author: { type: 'string' },
      project: { type: 'string' },
    },
    required: ['title', 'description', 'author', 'project'],
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

export default postChangelogSchema;
