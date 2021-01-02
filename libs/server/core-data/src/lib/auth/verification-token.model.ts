import { Schema, Connection, Model, Document } from 'mongoose';
import { defaultSchemaOptions } from '@ztp/server/utils';
import { IUser } from '@ztp/data';
import { IUserDocument } from '../users/user';
import { TSchemaDefinition } from '../interface';

export interface IVerificationToken {
  id: string;
  user: IUser;
  token: string;
}

export const verificationTokenDbKey = 'verificationToken';

export const verificationSchemaDef: TSchemaDefinition<IVerificationToken> = {
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
};

export const verificationTokenSchema = new Schema(verificationSchemaDef, {
  ...defaultSchemaOptions,
});

export interface IVerificationTokenDocument extends Document {
  id: string;
  userId: IUserDocument;
  token: string;
}

export interface IVerificationTokenModel
  extends Model<IVerificationTokenDocument> {
  findByToken(token: string): Promise<IVerificationTokenDocument | null>;
  deleteById(id: string): Promise<boolean>;
}

export class VerificationTokenClass extends Model {
  static findByToken(
    token: string
  ): Promise<IVerificationTokenDocument | null> {
    return this.findOne({
      token,
    }).exec();
  }

  static deleteById(id: string): Promise<boolean> {
    return this.deleteOne({ id })
      .exec()
      .then(({ ok, n }) => ok === 1);
  }
}

verificationTokenSchema.loadClass(VerificationTokenClass);

export function createVerificationTokenModel(con: Connection) {
  con.model<IVerificationTokenDocument>(
    verificationTokenDbKey,
    verificationTokenSchema
  );
}

export function getVerificationTokenModel(con: Connection) {
  return con.model<IVerificationTokenDocument>(
    verificationTokenDbKey
  ) as IVerificationTokenModel;
}
