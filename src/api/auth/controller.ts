import { FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { LoginUserInput, RegisterUserInput } from './models';
import {
  existEmail, existUsername, generateToken, isEmail,
} from './services';
import { createUser, getUserByEmail } from '../users/services';

export const login = async (req: FastifyRequest<LoginUserInput>) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    throw new Error('Wrong email format !');
  }
  let user;
  try {
    user = await getUserByEmail(email);
  } catch {
    throw new Error('Error server !');
  }
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Wrong email or password !');
  }
  const token = generateToken(user.id);
  return { token };
};

export const register = async (req: FastifyRequest<RegisterUserInput>) => {
  const { email, username, password } = req.body;
  if (!isEmail(email)) {
    throw new Error('Wrong email format !');
  } else if (await existEmail(email)) {
    throw new Error('Email already exists !');
  } else if (await existUsername(username)) {
    throw new Error('Username already exists !');
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    await createUser(email, username, hashedPassword);
    return { ok: true };
  } catch {
    throw new Error('Error server !');
  }
};
