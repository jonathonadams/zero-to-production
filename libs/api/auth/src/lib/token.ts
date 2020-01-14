import { sign, verify, decode } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { IUser } from '@uqt/interfaces';
import {
  AccessTokenConfig,
  RefreshTokenConfig,
  VerifyRefreshTokenConfig,
  JWKSConfig
} from './auth.interface';

// A function that returns a singed JWT
export function signAccessToken(config: AccessTokenConfig) {
  return (user: IUser) => {
    return sign(
      {
        // Enter additional payload info here
        // role: user.role
      },
      config.accessTokenPrivateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        expiresIn: config.accessTokenExpireTime,
        issuer: config.accessTokenIssuer,
        keyid: 'key'
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

export function retrievePublicKeyFormJWKS(config: JWKSConfig) {
  return (jwt: string) => {
    const { header } = decode(jwt, {
      complete: true
    }) as { header: { alg: string; kid: string; type: 'JWT' } };

    return jwksClient.koaJwtSecret({
      cache: true,
      rateLimit: true,
      strictSsl: config.production, // strict SSL in production
      jwksUri: `${config.authServerUrl}/.well-known/jwks.json`
    })(header);
  };
}
