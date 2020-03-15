import mongoose from 'mongoose';
import { GraphQLFieldResolver } from 'graphql';
import { generateResolvers } from './create-resolvers';

export type TResolverAuthGuard = (
  resolver: GraphQLFieldResolver<any, any, any>
) => GraphQLFieldResolver<any, any, any>;

export function createTypeResolver<T extends mongoose.Document>({
  model,
  name,
  userResourcesOnly = false
}: {
  model: mongoose.Model<T>;
  name: string;
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
    Query: {
      [`${name}`]: resolvers.getOne,
      [`all${name}s`]: resolvers.getAll
    },
    Mutation: {
      [`new${name}`]: resolvers.createOne,
      [`update${name}`]: resolvers.updateOne,
      [`remove${name}`]: resolvers.removeOne
    }
  };
  return typeResolver;
}
