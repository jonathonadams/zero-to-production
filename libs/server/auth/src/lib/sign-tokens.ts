import { sign } from 'jsonwebtoken';
import { IUser } from '@uqt/data';
import { AccessTokenConfig, RefreshTokenConfig } from './auth.interface';

// A function that returns a singed JWT
export function signAccessToken(config: AccessTokenConfig) {
  return (user: IUser) => {
    return sign(
      {
        // Enter additional payload info here
      },
      config.privateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        expiresIn: config.expireTime,
        issuer: config.issuer,
        keyid: config.keyId,
        audience: config.audience,
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
      config.privateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        issuer: config.issuer,
        audience: config.audience,
      }
    );
  };
}
