import mongoose from 'mongoose';
import { ITodo, ITodoDocument, ITodoModel } from '@workspace/shared/interfaces';
import { defaultSchemaOptions } from '@workspace/backend/resources';

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
      required: true
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
