import mongoose from 'mongoose';
import { defaultSchemaOptions } from '../../db/schema-options';
import { ITodo } from '@workspace/shared/interfaces';

export const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    title: String,
    description: String,
    completed: {
      type: Boolean,
      required: true
    }
  },
  {
    ...defaultSchemaOptions
  }
);

export interface ITodoDocument extends ITodo, mongoose.Document {
  id: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDocument> {}

export const Todo = mongoose.model<ITodoDocument, ITodoModel>(
  'todo',
  todoSchema
);
