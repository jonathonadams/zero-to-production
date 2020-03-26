import { Connection } from 'mongoose';
import {
  getTodoModel,
  createTodosResolver,
  createTodosRouter,
  getTodoNoteModel,
} from '@ztp/server/core-data';

export const todosResolvers = (con: Connection) => {
  const Todo = getTodoModel(con);
  const TodoNote = getTodoNoteModel(con);
  return createTodosResolver(Todo, TodoNote);
};

export const todosRouter = (con: Connection) => {
  const Todo = getTodoModel(con);
  const TodoNote = getTodoNoteModel(con);
  return createTodosRouter(Todo, TodoNote);
};
