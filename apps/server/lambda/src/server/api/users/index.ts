import {
  getUserModel,
  createUsersResolver,
  createUsersRouter
} from '@uqt/server/core-data';
import { Connection } from 'mongoose';

export const usersResolvers = (con: Connection) => {
  const User = getUserModel(con);
  return createUsersResolver(User);
};

export const usersRouter = (con: Connection) => {
  const User = getUserModel(con);
  return createUsersRouter(User);
};
