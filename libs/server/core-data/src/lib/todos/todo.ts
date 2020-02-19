import { Connection, Model, Schema, Document } from 'mongoose';
import { defaultSchemaOptions } from '@uqt/server/utils';
import { ITodo } from '@uqt/data';
export { todoTypeDef } from './todo.type';

export const todoDbKey = 'todo';

export const todoSchema = new Schema<ITodo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    title: String,
    description: String,
    completed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    ...defaultSchemaOptions
  }
);

export function createTodoModel(con: Connection): ITodoModel {
  return con.model<ITodoDocument, ITodoModel>(todoDbKey, todoSchema);
}

export function getTodoModel(con: Connection): ITodoModel {
  return con.model<ITodoDocument, ITodoModel>(todoDbKey);
}

export interface ITodoDocument extends ITodo, Document {
  id: string;
}

export interface ITodoModel extends Model<ITodoDocument> {}
