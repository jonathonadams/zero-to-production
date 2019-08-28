import mongoose from 'mongoose';
import { ITodo, ITodoDocument, ITodoModel } from '@ngw/shared/interfaces';
import { defaultSchemaOptions } from '@ngw/backend/utils';

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
