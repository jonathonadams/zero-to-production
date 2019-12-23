import mongoose from 'mongoose';
import { IUser } from '@uqt/interfaces';

export interface IUserDocument extends IUser, mongoose.Document {
  id: string;
}

export interface IFindByUsername<T> {
  findByUsername(name: string): Promise<T | null>;
}

export interface IUserModel
  extends mongoose.Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}
