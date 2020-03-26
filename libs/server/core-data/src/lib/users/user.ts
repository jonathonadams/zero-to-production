import { Connection, Schema, Document, Model } from 'mongoose';
import { IUser } from '@ztp/data';
import { defaultSchemaOptions } from '@ztp/server/utils';
export { userTypeDef } from './user.type';

export const userDbKey = 'user';

export const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      text: true,
      unique: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false, // ZTP_AFTER_CLONE -> set `unique: true`
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    ...defaultSchemaOptions,
  }
);

/**
 * This function is only used for the auth function and hence, must return the hashed password
 *
 * @param username The username to search by.
 */
userSchema.statics.findByUsername = function (
  username: string
): Promise<IUserDocument | null> {
  return this.findOne({
    username: username,
  })
    .select('+hashedPassword')
    .exec();
};

export function createUserModel(con: Connection): IUserModel {
  return con.model<IUserDocument, IUserModel>(userDbKey, userSchema);
}

export function getUserModel(con: Connection): IUserModel {
  return con.model<IUserDocument, IUserModel>(userDbKey);
}

export interface IUserDocument extends IUser, Document {
  id: string;
}

export interface IFindByUsername<T> {
  findByUsername(name: string): Promise<T | null>;
}

export interface IUserModel
  extends Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}
