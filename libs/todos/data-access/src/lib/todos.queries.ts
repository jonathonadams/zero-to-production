import gql from 'graphql-tag';

export const ALL_TODO_FIELDS = gql`
  fragment todoFields on Todo {
    id
    title
    description
    completed
  }
`;

export const ALL_TODOS_QUERY = gql`
  query AllTodos {
    allTodos {
      ...todoFields
    }
  }
  ${ALL_TODO_FIELDS}
`;

export const LOAD_TODO_QUERY = gql`
  query LoadTodo($id: ID!) {
    Todo(id: $id) {
      ...todoFields
    }
  }
  ${ALL_TODO_FIELDS}
`;

export const CREATE_TODO_QUERY = gql`
  mutation CreateTodo($input: NewTodoInput!) {
    newTodo(input: $input) {
      ...todoFields
    }
  }
  ${ALL_TODO_FIELDS}
`;

export const UPDATE_TODO_QUERY = gql`
  mutation UpdateTodo($input: UpdatedTodoInput!) {
    updateTodo(input: $input) {
      ...todoFields
    }
  }
  ${ALL_TODO_FIELDS}
`;

export const REMOVE_TODO_QUERY = gql`
  mutation DeleteTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
