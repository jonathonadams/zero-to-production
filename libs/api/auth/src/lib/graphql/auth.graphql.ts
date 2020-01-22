import { GraphQLResolveInfo, GraphQLFieldResolver } from 'graphql';
import { AuthMiddleware } from '../auth.interface';

/**
 * The authenticate request function takes an array of authentication middleware, and returns a function
 * that takes a resolver function as an argument each of the auth middleware functions are called with the
 * resolver arguments. An error is thrown if any authentication process fails.D
 */
export function authenticateRequest(authMiddlewares: AuthMiddleware[]) {
  return function resolverFn(
    resolverFunction: GraphQLFieldResolver<any, any, any>
  ): GraphQLFieldResolver<any, any, any> {
    return async function gqlResolver(
      parent: any,
      args: any,
      ctx: any,
      info: GraphQLResolveInfo
    ) {
      /**
       * loop over there auth functions if any
       * errors occurs they will throw bubble up
       */
      for (const middleware of authMiddlewares) {
        await middleware(parent, args, ctx, info);
      }

      // Return the resolver function to be called
      return resolverFunction(parent, args, ctx, info);
    };
  };
}
