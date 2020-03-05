import { gql } from 'apollo-server-koa';

export const authTypeDef = gql`
  type AuthPayload {
    token: String!
    expiresIn: Int!
  }

  input RegisterInput {
    givenName: String!
    surname: String!
    username: String!
    email: String!
    dateOfBirth: String!
    password: String!
  }

  type RegisterSuccess {
    id: ID!
    givenName: String!
    surname: String!
    username: String!
    email: String!
    dateOfBirth: String!
  }

  type UsernameAvailable {
    isAvailable: Boolean!
  }

  extend type Query {
    usernameAvailable(username: String!): UsernameAvailable!
  }

  extend type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(input: RegisterInput!): RegisterSuccess!
  }
`;
