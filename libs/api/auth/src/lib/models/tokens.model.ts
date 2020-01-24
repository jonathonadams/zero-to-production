import mongoose from 'mongoose';
import { defaultSchemaOptions } from '@uqt/api/utils';
import { IRefreshTokenDocument, IRefreshTokenModel } from '../auth.interface';

/**
 * This resource is not publicly available but used to store all refresh tokens
 */

export const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    token: {
      required: true,
      type: String
    }
  },
  {
    ...defaultSchemaOptions
  }
);

refreshTokenSchema.statics.findByTokenWithUser = function(
  token: string
): Promise<IRefreshTokenDocument | null> {
  return this.findOne({ token })
    .populate('user')
    .exec();
};

export const RefreshToken = mongoose.model<
  IRefreshTokenDocument,
  IRefreshTokenModel
>('refresh-token', refreshTokenSchema);
