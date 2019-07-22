import { sign } from 'jsonwebtoken';

export function signTestAccessToken<T>(user: any, secret: string): string {
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
