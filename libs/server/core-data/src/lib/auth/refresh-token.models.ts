import { Model, Document, Schema, Connection } from 'mongoose';
import { IUser } from '@ztp/data';
import { defaultSchemaOptions } from '@ztp/server/utils';
import { IUserDocument } from '../users';
import { TSchemaDefinition } from '../interface';

// -------------------------------------
// Interfaces for each Model
// -------------------------------------
export interface IRefreshToken {
  id: string;
  user: IUser;
  token: string;
}

export interface IRefreshTokenDocument extends IRefreshToken, Document {
  id: string;
  user: IUserDocument;
}

export interface IRefreshTokenModel extends Model<IRefreshTokenDocument> {
  findByToken(token: string): Promise<IRefreshTokenDocument | null>;
  removeByToken(token: string): Promise<IRefreshTokenDocument | null>;
  removeUserTokens(
    id: string
  ): Promise<{
    ok?: number | undefined;
    n?: number | undefined;
  }>;
  deleteById(id: string): Promise<boolean>;
}

/**
 * This resource is not publicly available but used to store all refresh tokens
 */

export const refreshTokenDbKey = 'refreshToken';

export const refreshSchemaDef: TSchemaDefinition<IRefreshToken> = {
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  token: {
    required: true,
    type: String,
  },
};

export const refreshTokenSchema = new Schema(refreshSchemaDef, {
  ...defaultSchemaOptions,
});

export class RefreshTokenClass extends Model {
  static findByToken(token: string): Promise<IRefreshTokenDocument | null> {
    return this.findOne({ token }).populate('user').exec();
  }

  static removeByToken(token: string): Promise<IRefreshTokenDocument | null> {
    return this.findOneAndDelete({ token }).exec();
  }

  static removeUserTokens(
    id: string
  ): Promise<{
    ok?: number | undefined;
    n?: number | undefined;
  }> {
    return this.deleteMany({ user: id }).exec();
  }

  static deleteById(id: string): Promise<boolean> {
    return this.deleteOne({ id })
      .exec()
      .then(({ ok, n }) => ok === 1);
  }
}

refreshTokenSchema.loadClass(RefreshTokenClass);

export function createRefreshTokenModel(con: Connection) {
  con.model<IRefreshTokenDocument>(refreshTokenDbKey, refreshTokenSchema);
}

export function getRefreshTokenModel(con: Connection) {
  return con.model<IRefreshTokenDocument>(
    refreshTokenDbKey
  ) as IRefreshTokenModel;
}
