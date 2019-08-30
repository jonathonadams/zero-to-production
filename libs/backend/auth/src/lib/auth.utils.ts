import { sign } from 'jsonwebtoken';
import { IUser } from '@ngw/shared/interfaces';

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
