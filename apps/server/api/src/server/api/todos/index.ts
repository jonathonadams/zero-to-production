import { model } from 'mongoose';
import {
  todoDbKey,
  todoSchema,
  ITodoDocument,
  ITodoModel,
  createTodosResolver,
  createTodosRouter
} from '@uqt/server/core-data';
import { verifyTokenGraphQL } from '../../auth/auth.guards';

export const Todo = model<ITodoDocument, ITodoModel>(todoDbKey, todoSchema);

export const todosResolvers = createTodosResolver(Todo, verifyTokenGraphQL);

export const todosRouter = createTodosRouter(Todo);
