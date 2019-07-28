import mongoose from 'mongoose';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { IUser, IUserDocument, IUserModel } from '@workspace/shared/interfaces';
import { defaultSchemaOptions } from '@workspace/backend/utils';

export const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      index: true
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
    .select('+hashedPassword')
    .exec();
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'user',
  userSchema
);
