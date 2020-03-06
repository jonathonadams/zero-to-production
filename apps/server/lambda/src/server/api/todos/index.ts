import { Connection } from 'mongoose';
import {
  getTodoModel,
  createTodosResolver,
  createTodosRouter,
  getTodoNoteModel
} from '@uqt/server/core-data';
import { TResolverAuthGuard } from '@uqt/server/auth';

export const todosResolvers = (con: Connection, guard: TResolverAuthGuard) => {
  const Todo = getTodoModel(con);
  const TodoNote = getTodoNoteModel(con);
  return createTodosResolver(Todo, TodoNote, guard);
};

export const todosRouter = (con: Connection) => {
  const Todo = getTodoModel(con);
  const TodoNote = getTodoNoteModel(con);
  return createTodosRouter(Todo, TodoNote);
};
