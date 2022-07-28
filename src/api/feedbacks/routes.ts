import { FastifyInstance } from 'fastify';
import {
  getFeedbacks, postFeedback, validate, deleteFeedback,
} from './controller';
import {
  postFeedbackSchema, getFeedbacksSchema, validateSchema, deleteFeedbackSchema,
} from './schema';

export const routes = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postFeedbackSchema,
    handler: postFeedback,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.get('/', {
    schema: getFeedbacksSchema,
    handler: getFeedbacks,
  });

  server.post('/:id/validate', {
    schema: validateSchema,
    handler: validate,
  });

  server.delete('/:id', {
    schema: deleteFeedbackSchema,
    handler: deleteFeedback,
  });
};
