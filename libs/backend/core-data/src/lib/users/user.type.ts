import gql from 'graphql-tag';

export const userTypeDef = gql`
  type User {
    id: ID!
    givenName: String!
    surname: String!
    username: String!
    email: String!
    dateOfBirth: String!
  }

  input UpdatedUserInput {
    id: ID!
    givenName: String
    surname: String
    username: String
    email: String
    dateOfBirth: String
  }

  type Query {
    User(id: ID!): User!
    allUsers: [User]!
  }

  type Mutation {
    updateUser(input: UpdatedUserInput!): User!
    removeUser(id: ID!): User!
  }

  type Subscription {
    User: User
  }
`;
