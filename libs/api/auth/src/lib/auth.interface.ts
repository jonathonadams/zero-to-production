import mongoose from 'mongoose';
import { IUserModel, IUserDocument } from '@uqt/api/core-data';

export type VerifyEmail = (to: string, token: string) => Promise<[any, {}]>;

// -------------------------------------
// For signing access and refresh tokens
// -------------------------------------
export interface AccessTokenConfig {
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  accessTokenIssuer: string;
}

export interface RefreshTokenConfig {
  refreshTokenPrivateKey: string;
}

export interface VerifyRefreshTokenConfig {
  refreshTokenPublicKey: string;
}

export interface EmailVerificationConfig {
  sendGridApiKey: string;
  hostUrl: string;
}

// -------------------------------------
// Interfaces for each controller
// -------------------------------------
export interface LoginControllerConfig extends AccessTokenConfig {
  User: IUserModel;
}

export interface VerifyControllerConfig {
  User: IUserModel;
  VerificationToken: IVerificationTokenModel;
}

export interface RegistrationControllerConfig extends VerifyControllerConfig {
  verificationEmail: VerifyEmail;
}

export interface AvailableControllerConfig {
  User: IUserModel;
}

export interface AuthorizeControllerConfig
  extends LoginControllerConfig,
    RefreshTokenConfig {
  RefreshToken: IRefreshTokenModel;
}

export interface RefreshControllerConfig
  extends AccessTokenConfig,
    VerifyRefreshTokenConfig {
  RefreshToken: IRefreshTokenModel;
}

export interface RevokeControllerConfig {
  RefreshToken: IRefreshTokenModel;
}

export interface AuthConfigWithRefreshTokens
  extends LoginControllerConfig,
    VerifyControllerConfig,
    VerifyRefreshTokenConfig,
    AuthorizeControllerConfig,
    RefreshControllerConfig,
    EmailVerificationConfig {}

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
