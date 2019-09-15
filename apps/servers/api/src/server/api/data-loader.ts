/* istanbul ignore file */
// @ts-ignore
import DataLoader from 'dataloader';
// @ts-ignore
import keyBy from 'lodash.keyby';
import { User } from './users';
import { Todo } from './todos';
import { IUserDocument, ITodoDocument } from '@ngw/types';

const createUsersLoader = () => {
  return new DataLoader<string, IUserDocument>(async usersIds => {
    const users = await User.find({
      _id: { $in: usersIds }
    }).exec();
    const usersByIds = keyBy(users, 'id');
    return usersIds.map((id: string) => usersByIds[id]);
  });
};

const createTodoLoader = () => {
  return new DataLoader<string, ITodoDocument>(async todosIds => {
    const todos = await Todo.find({
      _id: { $in: todosIds }
    }).exec();
    const todosById = keyBy(todos, 'id');
    return todosIds.map((id: string) => todosById[id]);
  });
};

export const loaders = () => {
  return {
    users: createUsersLoader(),
    todos: createTodoLoader()
  };
};
