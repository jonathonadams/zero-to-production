import mongoose from 'mongoose';

export interface ITodo {
  id: string;
  user: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ITodoDocument extends ITodo, mongoose.Document {
  id: string;
}

export interface ITodoModel extends mongoose.Model<ITodoDocument> {}
