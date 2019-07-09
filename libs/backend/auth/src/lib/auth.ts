import jsonwebtoken from 'jsonwebtoken';
import omit from 'lodash.omit';
import { IUser } from '@workspace/shared/interfaces';

const { sign } = jsonwebtoken;

// A function that returns a singed JWT
export function signAccessToken(config: any) {
  return function accessToken(user: IUser) {
    return sign(
      {
        // Enter additional payload info here
        role: user.role
      },
      config.secrets.accessToken,
      {
        subject: user.id.toString(),
        expiresIn: config.expireTime,
        issuer: 'your-company-here'
      }
    );
  };
}

export function signRefreshToken(config: any) {
  return function refreshToken(user: IUser) {
    return sign(
      {
        prop: 'some property'
      },
      config.secrets.refreshToken,
      {
        subject: user.id.toString(),
        issuer: 'your-company-here'
      }
    );
  };
}

export function userToJSON(user: IUser): IUser {
  return omit(user, ['hashedPassword', 'password']);
}

export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 6 &&
    /\d/.test(password) &&
    /\D/.test(password)
  );
}
