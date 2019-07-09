import { sign } from 'jsonwebtoken';
import { IUser } from '@workspace/shared/interfaces';

export function signAccessToken(user: IUser, secret: string): string {
  return sign(
    {
      // TODO
      role: 0
    },
    secret,
    {
      subject: user.id.toString(),
      issuer: 'your-company-here'
    }
  );
}
