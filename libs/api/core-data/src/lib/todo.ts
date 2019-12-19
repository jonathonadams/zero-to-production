import mongoose from 'mongoose';
import { ITodo } from '@uqt/interfaces';

export interface ITodoDocument extends ITodo, mongoose.Document {
  id: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDocument> {}
