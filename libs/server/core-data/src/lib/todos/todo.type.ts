import { gql } from 'apollo-server-koa';

export const todoTypeDef = gql`
  type Todo {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    completed: Boolean!
    dueDate: Date
    notes: [TodoNote]!
  }

  type TodoNote {
    id: ID!
    todoId: ID!
    body: String
    createdOn: DateTime!
  }

  input NewTodoInput {
    title: String!
    description: String!
    dueDate: Date
    completed: Boolean
  }

  input NewTodoNoteInput {
    todoId: ID!
    body: String
    createdOn: DateTime
  }

  input UpdatedTodoInput {
    id: ID!
    title: String
    description: String
    dueDate: Date
    completed: Boolean
  }

  extend type Query {
    Todo(id: ID!): Todo!
    allTodos: [Todo]!
    allTodoNotes(todoId: ID!): [TodoNote]!
  }

  extend type Mutation {
    newTodo(input: NewTodoInput!): Todo!
    updateTodo(input: UpdatedTodoInput!): Todo!
    removeTodo(id: ID!): Todo!
    newTodoNote(input: NewTodoNoteInput!): TodoNote!
    removeTodoNote(id: ID!): TodoNote!
  }
`;
