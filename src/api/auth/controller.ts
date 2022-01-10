import { FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import {
  IError, ErrorType, LoginUserInput, RegisterUserInput,
} from 'wizmi';
import {
  existEmail, existUsername, generateToken, isEmail,
} from './services';
import { createUser, findUserByEmail } from '../users/services';

export const login = async (req: FastifyRequest<{ Body: LoginUserInput }>) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    throw { type: ErrorType.BAD_REQUEST, key: 'invalid_email' } as IError;
  }
  try {
    const user = await findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'invalid_email_or_password' } as IError;
    }
    const token = generateToken(user.id);
    return { token };
  } catch (e) {
    throw e as IError;
  }
};

export const register = async (req: FastifyRequest<{ Body: RegisterUserInput }>) => {
  const { email, username, password } = req.body;
  if (!isEmail(email)) {
    throw { type: ErrorType.BAD_REQUEST, key: 'invalid_email' } as IError;
  } else if (await existEmail(email)) {
    throw { type: ErrorType.BAD_REQUEST, key: 'email_already_exists' } as IError;
  } else if (await existUsername(username)) {
    throw { type: ErrorType.BAD_REQUEST, key: 'username_already_exists' } as IError;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    await createUser(email, username, hashedPassword);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
