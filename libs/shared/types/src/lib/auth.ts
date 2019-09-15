import mongoose from 'mongoose';
import { IUserDocument, IUserSettings } from './user';

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegistrationDetails {
  username: string;
  password: string;
  givenName: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  settings: IUserSettings;
}

export interface IJWTPayload {
  sub: string; // subject (id)
  exp: number; // expire time
  iat: string; // issued at time
  role: number;
}

export interface IRefreshToken {
  user: IUserDocument;
  token: string;
}

export interface IRefreshTokenDocument
  extends IRefreshToken,
    mongoose.Document {
  id: string;
}

export interface IRefreshTokenModel
  extends mongoose.Model<IRefreshTokenDocument> {
  findByTokenWithUser(token: string): Promise<IRefreshTokenDocument | null>;
}

export interface IFindByUsername<T> {
  findByUsername(name: string): Promise<T | null>;
}
