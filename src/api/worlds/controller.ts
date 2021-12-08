import { FastifyRequest } from 'fastify';
import { CreateWorldInput } from './models';
import { createWorld, findAllWorlds } from './services';

export const getWorlds = async () => {
  try {
    const worlds = await findAllWorlds();
    return worlds;
  } catch {
    throw new Error('Error server !');
  }
};

export const postWorld = async (req: FastifyRequest<CreateWorldInput>) => {
  const { name, value } = req.body;
  try {
    await createWorld(name, value);
    return { ok: true };
  } catch {
    throw new Error('Error server !');
  }
};
