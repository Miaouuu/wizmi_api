import { FastifyRequest } from 'fastify';
import { IError, CreateWorldInput } from 'wizmi';
import { createWorld, findAllWorlds } from './services';

export const getAllWorlds = async () => {
  try {
    const worlds = await findAllWorlds();
    return worlds;
  } catch (e) {
    throw e as IError;
  }
};

export const postWorld = async (req: FastifyRequest<{ Body: CreateWorldInput }>) => {
  const { name, value } = req.body;
  try {
    await createWorld(name, value);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
