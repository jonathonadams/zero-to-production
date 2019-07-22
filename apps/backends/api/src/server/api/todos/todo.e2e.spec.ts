import { Todo } from './todo.model';
import { newId } from '@app-testing/backend/helpers';
import { createGraphQLSpec } from '@app-testing/backend/graphQLSpec';
import { schema } from '../graphql';
import config from '../../config';

const todo = {
  title: 'Some Todo',
  description: 'A todo that needs to be done',
  completed: false,
  user: newId()
};

const updatedTodo = {
  completed: true
};

createGraphQLSpec(schema, config.secrets.accessToken)(
  Todo,
  'Todo',
  todo,
  updatedTodo
);
