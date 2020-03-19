import mongoose from 'mongoose';
import { GraphQLFieldResolver } from 'graphql';
import { generateResolvers } from './create-resolvers';

export type TResolverAuthGuard = (
  resolver: GraphQLFieldResolver<any, any, any>
) => GraphQLFieldResolver<any, any, any>;

export function createTypeResolver<T extends mongoose.Document>({
  model,
  name,
  resolverAuthentication,
  userResourcesOnly = false
}: {
  model: mongoose.Model<T>;
  name: string;
  resolverAuthentication?: TResolverAuthGuard;
  userResourcesOnly?: boolean;
}): {
  Query: {
    [queryName: string]: GraphQLFieldResolver<any, any, any> | undefined;
  };
  Mutation: {
    [mutationName: string]: GraphQLFieldResolver<any, any, any> | undefined;
  };
  [name: string]: {
    [queryOrMutationName: string]:
      | GraphQLFieldResolver<any, any, any>
      | undefined;
  };
} {
  const resolvers = generateResolvers<T>(model, userResourcesOnly);

  const typeResolver = {
    Query: {} as any,
    Mutation: {} as any
  };

  if (resolverAuthentication) {
    typeResolver.Query[`${name}`] = resolverAuthentication(resolvers.getOne);
    typeResolver.Query[`all${name}s`] = resolverAuthentication(
      resolvers.getAll
    );
    typeResolver.Mutation[`new${name}`] = resolverAuthentication(
      resolvers.createOne
    );
    typeResolver.Mutation[`update${name}`] = resolverAuthentication(
      resolvers.updateOne
    );
    typeResolver.Mutation[`remove${name}`] = resolverAuthentication(
      resolvers.removeOne
    );
  } else {
    typeResolver.Query[`${name}`] = resolvers.getOne;
    typeResolver.Query[`all${name}s`] = resolvers.getAll;
    typeResolver.Mutation[`new${name}`] = resolvers.createOne;
    typeResolver.Mutation[`update${name}`] = resolvers.updateOne;
    typeResolver.Mutation[`remove${name}`] = resolvers.removeOne;
  }

  return typeResolver;
}
