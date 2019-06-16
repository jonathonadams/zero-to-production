export const ALL_TODO_PROPERTIES = `
  fragment allTodoProperties on Todo {
    id
    title
    description
    completed
  }
`;

export const ALL_TODOS_QUERY = `
  {
    allTodos {
      ...allTodoProperties
    }
  }
${ALL_TODO_PROPERTIES}
`;

export const LOAD_TODO_QUERY = `
  query LoadTodo($id: ID!) {
    Todo(id: $id) {
      ...allTodoProperties
    }
  }
  ${ALL_TODO_PROPERTIES}
`;

export const CREATE_TODO_QUERY = `
  mutation CreateTodo($input: NewTodoInput!) {
    newTodo(input: $input) {
      ...allTodoProperties
    }
  }
  ${ALL_TODO_PROPERTIES}
`;

export const UPDATE_TODO_QUERY = `
  mutation UpdateTodo($input: UpdatedTodoInput!) {
    updateTodo(input: $input) {
      ...allTodoProperties
    }
  }
  ${ALL_TODO_PROPERTIES}
`;

export const REMOTE_TODO_QUERY = `
  mutation DeleteTodo($id: ID!){
    removeTodo(id: $id) {
      id
    }
  }
`;
