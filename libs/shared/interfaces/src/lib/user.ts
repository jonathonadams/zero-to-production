import mongoose from 'mongoose';
import { AuthenticationRoles } from '@workspace/shared/enums';

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: Date;
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

export interface IUserModel extends mongoose.Model<IUserDocument> {
  findByUsername: (userName: string) => Promise<IUserDocument | null>;
}
