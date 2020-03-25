import { Schema, Connection } from 'mongoose';
import { defaultSchemaOptions } from '@uqt/server/utils';
import {
  IVerificationToken,
  IVerificationTokenDocument,
  IVerificationTokenModel,
} from '../auth.interface';

export const verificationTokenDbKey = 'verificationToken';

export const verificationTokenSchema = new Schema<IVerificationToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    ...defaultSchemaOptions,
  }
);

export function createVerificationTokenModel(
  con: Connection
): IVerificationTokenModel {
  return con.model<IVerificationTokenDocument, IVerificationTokenModel>(
    verificationTokenDbKey,
    verificationTokenSchema
  );
}

export function getVerificationTokenModel(
  con: Connection
): IVerificationTokenModel {
  return con.model<IVerificationTokenDocument, IVerificationTokenModel>(
    verificationTokenDbKey
  );
}
