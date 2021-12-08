import { FastifyRequest } from 'fastify';
import { getUserById } from './services';

const me = async (req: FastifyRequest) => {
  const { id } = req.user;
  let user;
  try {
    user = await getUserById(id);
  } catch {
    throw new Error('Error server !');
  }
  if (!user) {
    throw new Error('Account does\'t exist');
  }
  return {
    email: user.email,
    username: user.email,
    roles: user.roles,
  };
};

export default me;
