import mongoose from 'mongoose';
import { IUserDocument } from './user';

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IDecodedJWT {
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
