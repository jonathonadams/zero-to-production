import { createPublicKey } from 'crypto';
import { sign, verify, decode } from 'jsonwebtoken';
import { koaJwtSecret } from 'jwks-rsa';
import { IUser } from '@uqt/interfaces';
import {
  AccessTokenConfig,
  RefreshTokenConfig,
  JWKSGuardConfig
} from './auth.interface';

// A function that returns a singed JWT
export function signAccessToken(config: AccessTokenConfig) {
  return (user: IUser) => {
    return sign(
      {
        // Enter additional payload info here
        role: user.role
      },
      config.privateKey,
      {
        algorithm: 'RS256',
        subject: user.id,
        expiresIn: config.expireTime,
        issuer: config.issuer,
        keyid: config.keyId,
        audience: config.audience
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
        audience: config.audience
      }
    );
  };
}

export function verifyRefreshToken(config: RefreshTokenConfig) {
  // Create a public key from the private key
  const publicPem = createPublicKey(config.privateKey);
  const publicKey = publicPem.export({ format: 'pem', type: 'spki' });

  return (token: string) => {
    return verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: config.issuer,
      audience: config.audience
    });
  };
}

export function retrievePublicKeyFormJWKS(config: JWKSGuardConfig) {
  const jwksUri = `${config.authServerUrl}/.well-known/jwks.json`;

  const jwtSecret = koaJwtSecret({
    cache: true,
    // cacheMaxEntries: 5, // Default value
    // cacheMaxAge: ms('10h'), // Default value,
    rateLimit: true,
    // jwksRequestsPerMinute: 10, // Default value
    strictSsl: config.production, // strict SSL in production
    jwksUri
  });

  return (jwt: string) => {
    const { header } = decode(jwt, {
      complete: true
    }) as { header: { alg: string; kid: string; type: 'JWT' } };

    return jwtSecret(header);
  };
}
