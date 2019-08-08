import { sign } from 'jsonwebtoken';

export function signTestAccessToken<T>(user: any, secret: string): string {
  return sign(
    {
      role: user.role ? user.role : 0
    },
    secret,
    {
      subject: user.id.toString()
    }
  );
}
