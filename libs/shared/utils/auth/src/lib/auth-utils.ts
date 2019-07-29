// @ts-ignore
import omit from 'lodash.omit';
import { IUser } from '@ngw/shared/interfaces';

/**
 * Move into a shared utils function
 */
export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 6 &&
    /\d/.test(password) &&
    /\D/.test(password)
  );
}

export function userToJSON(user: IUser): IUser {
  return omit(user, ['hashedPassword', 'password']);
}
