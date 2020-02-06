import mongoose from 'mongoose';
import { IUser } from '@uqt/data';
import { defaultSchemaOptions } from '@uqt/server/utils';
export { userTypeDef } from './user.type';

export const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      text: true,
      unique: true
    },
    givenName: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: false // UQT_UPDATE -> set `unique: true`
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    hashedPassword: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    ...defaultSchemaOptions
  }
);

/**
 * This function is only used for the auth function and hence, must return the hashed password
 *
 * @param username The username to search by.
 */
userSchema.statics.findByUsername = function(
  username: string
): Promise<IUserDocument | null> {
  return this.findOne({
    username: username
  })
    .select('+hashedPassword')
    .exec();
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'user',
  userSchema
);

export interface IUserDocument extends IUser, mongoose.Document {
  id: string;
}

export interface IFindByUsername<T> {
  findByUsername(name: string): Promise<T | null>;
}

export interface IUserModel
  extends mongoose.Model<IUserDocument>,
    IFindByUsername<IUserDocument> {}
