import { FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { UserLoginInput, UserRegisterInput } from './models';
import {
  existEmail, existUsername, generateToken, isEmail,
} from './services';
import prisma from '../../prisma';

export const login = async (req: FastifyRequest<UserLoginInput>) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    throw new Error('Wrong email format !');
  }
  let user;
  try {
    user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
  } catch {
    throw new Error('Error server !');
  }
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Wrong email or password !');
  }
  const token = generateToken(user.id);
  return { token };
};

export const register = async (req: FastifyRequest<UserRegisterInput>) => {
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
    await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return { ok: true };
  } catch {
    throw new Error('Error server !');
  }
};
