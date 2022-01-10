import { FastifyRequest } from 'fastify';
import { IError, ErrorType } from 'wizmi';
import { findUserById } from './services';

const me = async (req: FastifyRequest) => {
  const { id } = req.user;
  try {
    const user = await findUserById(id);
    if (!user) {
      throw { type: ErrorType.NOT_FOUND, key: 'user_not_found' } as IError;
    }
    return {
      email: user.email,
      username: user.email,
      roles: user.roles,
    };
  } catch (e) {
    throw e as IError;
  }
};

export default me;
