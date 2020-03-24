/**
 * if the token has only been validated and the user has NOT been fetched from
 * the DB, then the use id will be ctx.user.sub. If it has been fetched from the
 * db then it will be ctx.use.id
 */
export function retrieveUserId(ctx: any): string | undefined {
  return ctx.user.sub ? ctx.user.sub : ctx.user.id;
}
