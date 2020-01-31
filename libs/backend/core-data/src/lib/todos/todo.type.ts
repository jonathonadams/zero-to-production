import { gql } from 'apollo-server-koa';

export const todoTypeDef = gql`
  type Todo {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  input NewTodoInput {
    userId: ID!
    title: String!
    description: String!
  }

  input UpdatedTodoInput {
    id: ID!
    userId: ID
    title: String
    description: String
    completed: Boolean
  }

  extend type Query {
    Todo(id: ID!): Todo!
    allTodos: [Todo]!
  }

  extend type Mutation {
    newTodo(input: NewTodoInput!): Todo!
    updateTodo(input: UpdatedTodoInput!): Todo!
    removeTodo(id: ID!): Todo!
  }
`;
