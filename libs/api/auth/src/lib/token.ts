import { sign } from 'jsonwebtoken';
import { IUser } from '@uqt/interfaces';
import {
  SignAccessTokenConfig,
  SignRefreshTokenConfig
} from './auth.interface';

// A function that returns a singed JWT
export function signAccessToken(config: SignAccessTokenConfig) {
  return function accessToken(user: IUser) {
    return sign(
      {
        // Enter additional payload info here
        role: user.role
      },
      config.accessTokenPrivateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        expiresIn: config.accessTokenExpireTime,
        issuer: 'your-company-here'
      }
    );
  };
}

export function signRefreshToken(config: SignRefreshTokenConfig) {
  return function refreshToken(user: IUser) {
    return sign(
      {
        // add whatever properties you desire here
      },
      config.refreshTokenPrivateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        issuer: 'your-company-here'
      }
    );
  };
}
