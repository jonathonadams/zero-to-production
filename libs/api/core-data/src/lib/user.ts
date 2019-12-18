import mongoose from 'mongoose';
import { AuthenticationRoles } from '@uqt/enums';

export interface IUser {
  id: string;
  username: string;
  givenName: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  role: AuthenticationRoles;
  active: boolean;
  isValid: boolean;
  hashedPassword?: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
  id: string;
}

export interface IFindByUsername<T> {
  findByUsername(name: string): Promise<T | null>;
}

export interface IUserModel
  extends mongoose.Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}
