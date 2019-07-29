import { IRefreshToken, IUser } from '@ngw/shared/interfaces';

export class MockRefreshTokenModel {
  static _token: IRefreshToken | null | undefined;
  _token: IRefreshToken;

  constructor(token: IRefreshToken) {
    this._token = { ...token } as IRefreshToken;
  }

  static async create(token: { user: IUser; token: string }) {
    return new MockRefreshTokenModel((token as unknown) as IRefreshToken);
  }

  static set findByTokenWithUserResponse(response: IRefreshToken) {
    this._token = response;
  }

  static findOne(where: { token: string }) {
    return {
      exec: async () => {
        const t = await this.findByTokenWithUser(where.token);
        if (t) {
          return {
            ...t,
            remove: async () => true
          };
        } else {
          return null;
        }
      }
    };
  }

  static async findByTokenWithUser(tokenString: string) {
    if (this._token && this._token.token === tokenString) {
      return this._token;
    } else {
      return null;
    }
  }

  static reset() {
    this._token = undefined;
  }

  toJSON() {
    return this._token;
  }
}
