import mongoose from 'mongoose';

export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}

/**
 * A mock VerificationToken to test the auth routes
 */
export class MockVerificationToken {
  static _token: any | null | undefined;
  _token: any;

  constructor(details: { userId: string; token: string }) {
    this._token = details;
  }

  static set tokenToRespondWith(token: any | null) {
    if (!token) {
      this._token = token;
    } else {
      this._token = { ...token };
    }
  }

  static findOne(details: any) {
    const token = this._token;
    return {
      exec: async () => {
        return token;
      },
    };
  }

  static reset() {
    this._token = undefined;
  }

  async remove() {
    return true;
  }

  async save() {
    if (!this._token.id) {
      this._token.id = newId();
    }
    return this._token;
  }
}
