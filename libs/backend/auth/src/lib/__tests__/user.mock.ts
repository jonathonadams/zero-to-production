import { IUser } from '@ngw/shared/interfaces';
import { newId } from '@app-testing/index';

export class MockUserModel {
  static _user: IUser | null | undefined;
  _user: IUser;

  constructor(user: IUser) {
    this._user = { ...user };
  }

  static set userToRespondWith(user: IUser | null) {
    if (!user) {
      this._user = user;
    } else {
      this._user = { ...user } as IUser;
    }
  }

  static async findByUsername(username: string) {
    if (this._user && username === this._user.username) {
      return this._user;
    } else {
      return null;
    }
  }

  static async findById(id: string) {
    if (this._user && id === this._user.id) {
      return this._user;
    } else {
      return null;
    }
  }

  static reset() {
    this._user = undefined;
  }

  toJSON() {
    return this._user;
  }

  async save() {
    if (!this._user.id) {
      this._user.id = newId();
    }
    return this._user;
  }
}
