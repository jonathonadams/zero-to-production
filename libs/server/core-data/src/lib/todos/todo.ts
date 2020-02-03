import mongoose from 'mongoose';
import { defaultSchemaOptions } from '@uqt/server/utils';
import { ITodo } from '@uqt/data';
export { todoTypeDef } from './todo.type';

export const todoSchema = new mongoose.Schema<ITodo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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

export const Todo = mongoose.model<ITodoDocument, ITodoModel>(
  'todo',
  todoSchema
);

export interface ITodoDocument extends ITodo, mongoose.Document {
  id: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDocument> {}
