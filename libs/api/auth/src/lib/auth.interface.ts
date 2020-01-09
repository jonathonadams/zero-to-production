import mongoose from 'mongoose';
import { IUserModel, IUserDocument } from '@uqt/api/core-data';

// -------------------------------------
// For signing access and refresh tokens
// -------------------------------------
export interface SignAccessTokenConfig {
  accessTokenPrivateKey: string;
  expireTime: number;
}

export interface SignRefreshTokenConfig {
  refreshTokenPrivateKey: string;
}

// -------------------------------------
// Interfaces for each controller
// -------------------------------------
export interface LoginControllerConfig extends SignAccessTokenConfig {
  userModel: IUserModel;
}

export interface VerifyUserControllerConfig {
  User: IUserModel;
  VerificationToken: IVerificationTokenModel;
}

export interface RegistrationControllerConfig
  extends VerifyUserControllerConfig {
  sendVerificationEmail: (to: string, token: string) => Promise<[any, {}]>;
}

// -------------------------------------
// TODO ---------
// -------------------------------------

export interface AuthRouteOptions {
  userLogin?: boolean;
  userRegistration?: boolean;
  refreshTokens?: boolean;
}

export interface AuthModels {
  userModel: IUserModel;
  verificationModel?: IVerificationTokenModel;
  refreshTokenModel?: IRefreshTokenModel;
}

export interface AuthRoutesConfig {
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey?: string;
  sendGridApiKey?: string;
  hostUrl?: string;
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

// /**
//  * Non 0 indexed because *ngIf === 0" will be false
//  */
// export enum AvailableStatus {
//   Available = 1,
//   UnAvailable = 2,
//   Pending = 3
// }
