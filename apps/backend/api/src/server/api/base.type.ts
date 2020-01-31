import { gql } from 'apollo-server-koa';

export const baseTypeDef = gql`
  scalar Date
  scalar Time
  scalar DateTime
  scalar Upload

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
