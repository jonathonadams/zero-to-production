import mongoose from 'mongoose';
import { AuthenticationRoles } from '@uqt/enums';
import { IFindByUsername } from './auth';

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

export interface IUserModel
  extends mongoose.Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}

export interface IVerificationToken {
  userId: string;
  token: string;
}

export interface IVerificationTokenDocument
  extends IVerificationToken,
    mongoose.Document {
  id: string;
}

export interface IVerificationTokenModel
  extends mongoose.Model<IVerificationTokenDocument> {}
