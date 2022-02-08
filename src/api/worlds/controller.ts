import { FastifyRequest } from 'fastify';
import { IError, CreateWorldInput } from 'wizmi';
import { createWorld, findWorlds } from './services';

export const getWorlds = async () => {
  try {
    const worlds = await findWorlds();
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
