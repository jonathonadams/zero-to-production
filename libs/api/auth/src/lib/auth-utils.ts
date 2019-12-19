import { sign } from 'jsonwebtoken';
// @ts-ignore
import omit from 'lodash.omit';
import { IUser } from '@uqt/interfaces';

// A function that returns a singed JWT
export function signAccessToken({
  secret,
  expireTime
}: {
  secret: string;
  expireTime: number;
}) {
  return function accessToken(user: IUser) {
    return sign(
      {
        // Enter additional payload info here
        role: user.role
      },
      secret,
      {
        subject: user.id.toString(),
        expiresIn: expireTime,
        issuer: 'your-company-here'
      }
    );
  };
}

export function signRefreshToken({ secret }: { secret: string }) {
  return function refreshToken(user: IUser) {
    return sign(
      {
        prop: 'some property'
      },
      secret,
      {
        subject: user.id.toString(),
        issuer: 'your-company-here'
      }
    );
  };
}

export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 6 &&
    /\d/.test(password) &&
    /\D/.test(password)
  );
}

export function userToJSON<T>(user: T): T {
  return omit(user, ['hashedPassword', 'password']);
}
