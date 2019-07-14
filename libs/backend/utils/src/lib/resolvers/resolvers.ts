import mongoose from 'mongoose';
import { GraphQLFieldResolver } from 'graphql';
import { generateResolvers } from './create-resolvers';

export function createTypeResolver<T extends mongoose.Document>(
  model: mongoose.Model<T>,
  name: string
): {
  Query: {
    [queryName: string]: GraphQLFieldResolver<any, any, any> | undefined;
  };
  Mutation: {
    [mutationName: string]: GraphQLFieldResolver<any, any, any> | undefined;
  };
} {
  const resolvers = generateResolvers<T>(model);

  const typeResolver = {
    Query: {} as any,
    Mutation: {} as any
  };

  // TODO -> Add authentication back

  //   typeResolver.Query[`${name}`] = authenticateRequest(verifyToken)(
  //     resolvers.getOne
  //   );
  //   typeResolver.Query[`all${name}s`] = authenticateRequest(verifyToken)(
  //     resolvers.getAll
  //   );
  //   typeResolver.Mutation[`new${name}`] = authenticateRequest(verifyToken)(
  //     resolvers.createOne
  //   );
  //   typeResolver.Mutation[`update${name}`] = authenticateRequest(verifyToken)(
  //     resolvers.updateOne
  //   );
  //   typeResolver.Mutation[`remove${name}`] = authenticateRequest(verifyToken)(
  //     resolvers.removeOne
  //   );

  typeResolver.Query[`${name}`] = resolvers.getOne;
  typeResolver.Query[`all${name}s`] = resolvers.getAll;
  typeResolver.Mutation[`new${name}`] = resolvers.createOne;
  typeResolver.Mutation[`update${name}`] = resolvers.updateOne;
  typeResolver.Mutation[`remove${name}`] = resolvers.removeOne;

  return typeResolver;
}
