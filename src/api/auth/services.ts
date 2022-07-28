import { FastifyRequest } from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import { IError, ErrorType } from 'wizmi';
import { findUserByEmail, findUserById, findUserByUsername } from '../users/services';

const { JWT_SECRET = 'meow', API_TOKEN = 'woof' } = process.env;

function jwt(token: string, secret: string): Promise<number> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded?.id);
    });
  });
}

export const verifToken = async (req: FastifyRequest) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'no_token_provided' } as IError;
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'no_token_provided' } as IError;
  }
  try {
    const id = await jwt(token, JWT_SECRET);
    if (typeof id !== 'number') {
      throw { type: ErrorType.UNAUTHORIZED, key: 'server_error' } as IError;
    }
    req.user = {
      id,
    };
  } catch {
    throw { type: ErrorType.UNAUTHORIZED, key: 'wrong_token' } as IError;
  }
};

export const verifApiToken = async (req: FastifyRequest) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'no_token_provided' } as IError;
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'no_token_provided' } as IError;
  }
  if (token !== API_TOKEN) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'wrong_token' } as IError;
  }
};

export const isAdmin = async (req: FastifyRequest) => {
  const { id } = req.user;
  const user = await findUserById(id);
  if (!user) {
    throw { type: ErrorType.NOT_FOUND, key: 'user_not_found' } as IError;
  }
  if (!user.roles.includes('ADMIN')) {
    throw { type: ErrorType.UNAUTHORIZED, key: 'no_permission' } as IError;
  }
};

export const generateToken = (id: number) => jsonwebtoken.sign({ id }, JWT_SECRET);

export const isEmail = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase());

export const existEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const existUsername = async (username: string): Promise<boolean> => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
