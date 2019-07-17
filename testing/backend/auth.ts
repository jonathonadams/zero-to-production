import { sign } from 'jsonwebtoken';
import { IUser } from '@workspace/shared/interfaces';

export function signTestAccessToken(user: IUser, secret: string): string {
  return sign(
    {
      // TODO
      role: 0
    },
    secret,
    {
      subject: user.id.toString()
    }
  );
}
