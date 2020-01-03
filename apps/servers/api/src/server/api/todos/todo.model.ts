import mongoose from 'mongoose';
import { ITodoDocument, ITodoModel } from '@uqt/api/core-data';
import { defaultSchemaOptions } from '@uqt/api/utils';
import { ITodo } from '@uqt/interfaces';

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
