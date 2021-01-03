import { model } from 'mongoose';
import {
  todoDbKey,
  todoSchema,
  ITodoDocument,
  ITodoModel,
  ITodoNoteDocument,
  ITodoNoteModel,
  todoNoteDbKey,
  todoNoteSchema,
} from '@ztp/server/core-data';

export const Todo = model<ITodoDocument>(todoDbKey, todoSchema) as ITodoModel;
export const TodoNote = model<ITodoNoteDocument>(
  todoNoteDbKey,
  todoNoteSchema
) as ITodoNoteModel;
