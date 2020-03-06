import { model } from 'mongoose';
import {
  todoDbKey,
  todoSchema,
  ITodoDocument,
  ITodoModel,
  createTodosResolver,
  createTodosRouter,
  ITodoNoteDocument,
  ITodoNoteModel,
  todoNoteDbKey,
  todoNoteSchema
} from '@uqt/server/core-data';
import { verifyTokenGraphQL } from '../../auth/auth.guards';

export const Todo = model<ITodoDocument, ITodoModel>(todoDbKey, todoSchema);
export const TodoNote = model<ITodoNoteDocument, ITodoNoteModel>(
  todoNoteDbKey,
  todoNoteSchema
);

export const todosResolvers = createTodosResolver(
  Todo,
  TodoNote,
  verifyTokenGraphQL
);

export const todosRouter = createTodosRouter(Todo, TodoNote);
