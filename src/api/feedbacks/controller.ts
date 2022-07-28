import { FastifyRequest } from 'fastify';
import {
  IError, ErrorType, CreateFeedbackInput, ValidateFeedbackParams, DeleteFeedbackParams,
} from 'wizmi';
import {
  findAllFeedbacks, createFeedback, removeFeedback, validateFeedback, findOneFeedback,
} from './services';

export const postFeedback = async (req: FastifyRequest<{ Body: CreateFeedbackInput }>) => {
  const { title, description } = req.body;
  try {
    await createFeedback(title, description);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};

export const getFeedbacks = async () => {
  try {
    const feedbacks = await findAllFeedbacks();
    return feedbacks;
  } catch (e) {
    throw e as IError;
  }
};

export const validate = async (req: FastifyRequest<{ Params: ValidateFeedbackParams }>) => {
  const { id } = req.params;
  try {
    const feedback = await findOneFeedback(id);
    if (!feedback) {
      throw { type: ErrorType.NOT_FOUND, key: 'level_not_found' } as IError;
    }
    await validateFeedback(feedback.title, feedback.description);
    await removeFeedback(id);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};

export const deleteFeedback = async (req: FastifyRequest<{ Params: DeleteFeedbackParams }>) => {
  const { id } = req.params;
  try {
    await removeFeedback(id);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
