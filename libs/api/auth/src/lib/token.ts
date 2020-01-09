import { sign, verify } from 'jsonwebtoken';
import { IUser } from '@uqt/interfaces';
import {
  AccessTokenConfig,
  RefreshTokenConfig,
  VerifyRefreshTokenConfig
} from './auth.interface';

// A function that returns a singed JWT
export function signAccessToken(config: AccessTokenConfig) {
  return (user: IUser) => {
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

export function signRefreshToken(config: RefreshTokenConfig) {
  return (user: IUser) => {
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

export function verifyRefreshToken({
  refreshTokenPublicKey
}: VerifyRefreshTokenConfig) {
  return (token: string) => {
    return verify(token, refreshTokenPublicKey, { algorithms: ['RS256'] });
  };
}
