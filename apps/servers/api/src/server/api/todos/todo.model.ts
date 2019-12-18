import mongoose from 'mongoose';
import { ITodo, ITodoDocument, ITodoModel } from '@uqt/api/core-data';
import { defaultSchemaOptions } from '@uqt/api/utils';

export const todoSchema = new mongoose.Schema<ITodo>(
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
