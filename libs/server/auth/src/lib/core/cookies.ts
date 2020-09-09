import Cookies, { SetOption } from 'cookies';

const options: SetOption = {
  maxAge: 31536000000, // 1000 * 60 * 60 * 24 * 365
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/authorize', // set to only the /authorize path so it is sent on both /refresh & /revoke
  // ZTP_AFTER_CLONE You may want to delete the domain below so that it defaults to the host
  // This is set so the the demo site works and the cookie is sent to both
  // https://api.zero-to-production.dev && https://fns.zero-to-production.dev
  domain: 'zero-to-production.dev',
};

export function setRefreshTokenCookie(cookies: Cookies, refreshToken?: string) {
  if (refreshToken) {
    cookies.set('refresh_token', refreshToken, options);
  } else {
    cookies.set('refresh_token');
  }
}
