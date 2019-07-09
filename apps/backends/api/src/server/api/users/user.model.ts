import mongoose from 'mongoose';
import { AuthenticationRoles, IUser } from '@workspace/shared/interfaces';
import { defaultSchemaOptions } from '../../../../../../../libs/backend/resources/src/lib/schema-options';

export const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true
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
    settings: {
      darkMode: {
        type: Boolean,
        required: true
      },
      colors: {
        lightPrimary: String,
        lightAccent: String,
        darkPrimary: String,
        darkAccent: String
      }
    },
    role: {
      type: Number,
      required: true,
      select: false,
      default: AuthenticationRoles.User
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
    .select('+hashedPassword +role')
    .exec();
};

export interface IUserDocument extends IUser, mongoose.Document {
  id: string;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  findByUsername: (userName: string) => Promise<IUserDocument | null>;
}

export const User = mongoose.model<IUserDocument, IUserModel>(
  'user',
  userSchema
);
