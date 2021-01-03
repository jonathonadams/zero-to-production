import { model } from 'mongoose';
import {
  userDbKey,
  userSchema,
  IUserDocument,
  IUserModel,
} from '@ztp/server/core-data';

export const User = model<IUserDocument>(userDbKey, userSchema) as IUserModel;
