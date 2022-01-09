import { FastifyRequest } from 'fastify';
import { IError } from 'wizmi';
import { CreateWorldInput } from './models';
import { createWorld, findAllWorlds } from './services';

export const getWorlds = async () => {
  try {
    const worlds = await findAllWorlds();
    return worlds;
  } catch (e) {
    throw e as IError;
  }
};

export const postWorld = async (req: FastifyRequest<CreateWorldInput>) => {
  const { name, value } = req.body;
  try {
    await createWorld(name, value);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
