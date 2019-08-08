import mongoose from 'mongoose';
import { AuthenticationRoles } from '@ngw/shared/enums';
import { IFindByUsername } from './auth';

export interface IUser {
  id: string;
  username: string;
  givenName: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  settings: IUserSettings;
  role: AuthenticationRoles;
  active: boolean;
  hashedPassword?: string;
}

export interface IUserSettings {
  darkMode: boolean;
  colors: {
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
  };
}

export interface IUserDocument extends IUser, mongoose.Document {
  id: string;
}

export interface IUserModel
  extends mongoose.Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}
