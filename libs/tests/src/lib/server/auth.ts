import { sign } from 'jsonwebtoken';

// A function that returns a singed JWT
export function signTestAccessToken(config: {
  privateKey: string;
  expireTime: number;
  issuer: string;
  keyId: string;
  audience: string;
}) {
  return (user: { id: string }) => {
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
