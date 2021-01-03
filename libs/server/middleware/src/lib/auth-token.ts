import type { Middleware } from 'koa';

// https://tools.ietf.org/html/rfc7519
const JWT_SPECIFIC_REGEX = /^Bearer ([a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+)?$/;

export function extractToken(string: string): string | undefined {
  const token = JWT_SPECIFIC_REGEX.exec(string);
  return (token || [])[1];
}

/**
 * Simple middleware to extract the Bearer token from the Authorization header
 */
export const authToken = (): Middleware => (ctx, next) => {
  const authHeader = ctx.request.header.authorization;
  if (!authHeader) return next();

  ctx.state.token = extractToken(authHeader);
  return next();
};
