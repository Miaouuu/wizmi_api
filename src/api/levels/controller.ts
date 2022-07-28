import { FastifyRequest } from 'fastify';
import {
  ErrorType, FindLevelParams, IError, CreateLevelInput,
} from 'wizmi';
import { createLevel, findLevel } from './services';

export const getLevel = async (req: FastifyRequest<{ Params: FindLevelParams }>) => {
  const { id } = req.params;
  try {
    const level = await findLevel(id);
    if (!level) {
      throw { type: ErrorType.NOT_FOUND, key: 'level_not_found' } as IError;
    }
    return level;
  } catch (e) {
    throw e as IError;
  }
};

export const postLevel = async (req: FastifyRequest<{ Body: CreateLevelInput }>) => {
  try {
    await createLevel(req.body);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
