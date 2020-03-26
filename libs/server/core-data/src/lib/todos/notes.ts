import { Connection, Model, Schema, Document } from 'mongoose';
import { defaultSchemaOptions } from '@uqt/server/utils';
import { ITodoNote } from '@uqt/data';
import { todoDbKey, todoNoteDbKey } from './todo';

export const todoNoteSchema = new Schema<ITodoNote>(
  {
    todoId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: todoDbKey,
    },
    body: String,
    createdOn: {
      type: Date,
      default: new Date(),
    },
  },
  {
    ...defaultSchemaOptions,
  }
);

export function createTodoNoteModel(con: Connection): ITodoNoteModel {
  return con.model<ITodoNoteDocument, ITodoNoteModel>(
    todoNoteDbKey,
    todoNoteSchema
  );
}

export function getTodoNoteModel(con: Connection): ITodoNoteModel {
  return con.model<ITodoNoteDocument, ITodoNoteModel>(todoNoteDbKey);
}

export interface ITodoNoteDocument extends ITodoNote, Document {
  id: string;
}

export interface ITodoNoteModel extends Model<ITodoNoteDocument> {}
