import { sign } from 'jsonwebtoken';
import { User } from '@workspace/shared/data';

export function signAccessToken(user: User, secret: string): string {
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
