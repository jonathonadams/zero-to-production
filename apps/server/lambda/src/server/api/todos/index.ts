import { Connection } from 'mongoose';
import {
  getTodoModel,
  createTodosResolver,
  createTodosRouter
} from '@uqt/server/core-data';
import { TResolverAuthGuard } from '@uqt/server/auth';

export const todosResolvers = (con: Connection, guard: TResolverAuthGuard) => {
  const Todo = getTodoModel(con);
  return createTodosResolver(Todo, guard);
};

export const todosRouter = (con: Connection) => {
  const Todo = getTodoModel(con);
  return createTodosRouter(Todo);
};
