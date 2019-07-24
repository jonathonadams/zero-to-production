import gql from 'graphql-tag';

// TODO - Move away from user Queries

// The GraphQL Auth schema
export const authTypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
