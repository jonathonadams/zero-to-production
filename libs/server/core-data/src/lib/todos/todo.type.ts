import { gql } from 'apollo-server-koa';

export const todoTypeDef = gql`
  type Todo {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    completed: Boolean!
    dueDate: String @formatDate
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
    Todo(id: ID!): Todo! @activeUser
    allTodos: [Todo]! @activeUser
    allTodoNotes(todoId: ID!): [TodoNote]! @activeUser
  }

  extend type Mutation {
    newTodo(input: NewTodoInput!): Todo! @activeUser
    updateTodo(input: UpdatedTodoInput!): Todo! @activeUser
    removeTodo(id: ID!): Todo! @activeUser
    newTodoNote(input: NewTodoNoteInput!): TodoNote! @activeUser
    removeTodoNote(id: ID!): TodoNote! @activeUser
  }
`;
