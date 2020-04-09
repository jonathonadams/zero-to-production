import { User } from './user.model';
import { createUsersResolver, createUsersRouter } from '@ztp/server/core-data';

export { User };

export const userResolvers = createUsersResolver(User);

export const usersRouter = createUsersRouter(User);
