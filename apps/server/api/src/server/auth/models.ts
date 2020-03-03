import { model } from 'mongoose';
import {
  refreshTokenDbKey,
  refreshTokenSchema,
  IRefreshTokenDocument,
  IRefreshTokenModel,
  verificationTokenDbKey,
  verificationTokenSchema,
  IVerificationTokenDocument,
  IVerificationTokenModel
} from '@uqt/server/auth';

export const RefreshToken = model<IRefreshTokenDocument, IRefreshTokenModel>(
  refreshTokenDbKey,
  refreshTokenSchema
);

export const VerificationToken = model<
  IVerificationTokenDocument,
  IVerificationTokenModel
>(verificationTokenDbKey, verificationTokenSchema);
