import mongoose from 'mongoose';
import { defaultSchemaOptions } from '@ngw/backend/utils';
import {
  IVerificationToken,
  IVerificationTokenDocument,
  IVerificationTokenModel
} from '@ngw/shared/interfaces';

export const verificationTokenSchema = new mongoose.Schema<IVerificationToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    ...defaultSchemaOptions
  }
);

export const VerificationToken = mongoose.model<
  IVerificationTokenDocument,
  IVerificationTokenModel
>('verificationToken', verificationTokenSchema);
