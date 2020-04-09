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

export const Todo = model<ITodoDocument, ITodoModel>(todoDbKey, todoSchema);
export const TodoNote = model<ITodoNoteDocument, ITodoNoteModel>(
  todoNoteDbKey,
  todoNoteSchema
);
