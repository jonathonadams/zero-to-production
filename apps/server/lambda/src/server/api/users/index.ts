import {
  getUserModel,
  createUsersResolver,
  createUsersRouter
} from '@uqt/server/core-data';
import { Connection } from 'mongoose';
import { TResolverAuthGuard } from '@uqt/server/auth';

export const usersResolvers = (con: Connection, guard: TResolverAuthGuard) => {
  const User = getUserModel(con);
  return createUsersResolver(User, guard);
};

export const usersRouter = (con: Connection) => {
  const User = getUserModel(con);
  return createUsersRouter(User);
};
