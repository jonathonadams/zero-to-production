import merge from 'lodash.merge';
import { IResolvers } from 'graphql-tools';
// @ts-ignore
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

// A function to add additional Scalar types.
const resolverFunctions = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};

export function createResolvers(...resolvers: IResolvers[]): IResolvers[] {
  // All the resolvers as an object.
  return merge({}, resolverFunctions, ...resolvers);
}
