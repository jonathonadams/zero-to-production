import { Schema, Connection } from 'mongoose';
import { defaultSchemaOptions } from '@ztp/server/utils';
import { IRefreshTokenDocument, IRefreshTokenModel } from '../auth.interface';

/**
 * This resource is not publicly available but used to store all refresh tokens
 */

export const refreshTokenDbKey = 'refreshToken';

export const refreshTokenSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    token: {
      required: true,
      type: String,
    },
  },
  {
    ...defaultSchemaOptions,
  }
);

refreshTokenSchema.statics.findByTokenWithUser = function (
  token: string
): Promise<IRefreshTokenDocument | null> {
  return this.findOne({ token }).populate('user').exec();
};

export function createRefreshTokenModel(con: Connection): IRefreshTokenModel {
  return con.model<IRefreshTokenDocument, IRefreshTokenModel>(
    refreshTokenDbKey,
    refreshTokenSchema
  );
}

export function getRefreshTokenModel(con: Connection): IRefreshTokenModel {
  return con.model<IRefreshTokenDocument, IRefreshTokenModel>(
    refreshTokenDbKey
  );
}
