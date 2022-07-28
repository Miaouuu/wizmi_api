import { ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';
import linearClient from '../../linear';

const { LINEAR_TEAM_ID = '', LINEAR_LABEL_ID = '' } = process.env;

export const findOneFeedback = async (id: number) => {
  try {
    const feedbacks = await prisma.feedbacks.findFirst({
      where: {
        id,
      },
    });
    return feedbacks;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const findAllFeedbacks = async () => {
  try {
    const feedbacks = await prisma.feedbacks.findMany();
    return feedbacks;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const createFeedback = async (title: string, description: string) => {
  try {
    await prisma.feedbacks.create({
      data: {
        title,
        description,
      },
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const validateFeedback = async (title: string, description: string) => {
  try {
    await linearClient.issueCreate({
      title, description, labelIds: [LINEAR_LABEL_ID], teamId: LINEAR_TEAM_ID,
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const removeFeedback = async (id: number) => {
  try {
    await prisma.feedbacks.delete({
      where: {
        id,
      },
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
