import { model } from 'mongoose';
import {
  refreshTokenDbKey,
  refreshTokenSchema,
  IRefreshTokenDocument,
  verificationTokenDbKey,
  verificationTokenSchema,
  IVerificationTokenDocument,
  IVerificationTokenModel,
  IRefreshTokenModel,
} from '@ztp/server/core-data';

export const RefreshToken = model<IRefreshTokenDocument>(
  refreshTokenDbKey,
  refreshTokenSchema
) as IRefreshTokenModel;

export const VerificationToken = model<IVerificationTokenDocument>(
  verificationTokenDbKey,
  verificationTokenSchema
) as IVerificationTokenModel;
