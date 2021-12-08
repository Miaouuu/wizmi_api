import { FastifyRequest } from 'fastify';
import { CreateWorldInput } from './models';
import { createWorld, getAllWorlds } from './services';

export const allWorlds = async () => {
  try {
    const worlds = await getAllWorlds();
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
