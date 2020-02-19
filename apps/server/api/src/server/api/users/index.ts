import { model } from 'mongoose';
import {
  userDbKey,
  userSchema,
  IUserDocument,
  IUserModel,
  createUsersResolver,
  createUsersRouter
} from '@uqt/server/core-data';
import { verifyTokenGraphQL } from '../../auth/auth.guards';

export const User = model<IUserDocument, IUserModel>(userDbKey, userSchema);

export const userResolvers = createUsersResolver(User, verifyTokenGraphQL);

export const usersRouter = createUsersRouter(User);
