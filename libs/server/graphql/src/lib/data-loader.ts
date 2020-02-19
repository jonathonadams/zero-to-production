/* istanbul ignore file */
// @ts-ignore
import DataLoader from 'dataloader';
// @ts-ignore
import keyBy from 'lodash.keyby';
import { Model as MongooseModel, Document } from 'mongoose';

export interface IModels {
  [key: string]: typeof MongooseModel;
}

export type TLoader = () => DataLoader<string, Document, string>;

export interface ILoaders {
  [key: string]: TLoader;
}

/**
 * Factory function to generate loaders for each model in the the 'models map'
 *
 * @param models
 */
export function createLoaders(models: IModels) {
  const loaders = Object.keys(models).reduce((allLoaders, key) => {
    const Model = models[key];
    allLoaders[key] = () => {
      return new DataLoader<string, Document>(async resourcesIds => {
        const resources = await Model.find({
          _id: { $in: resourcesIds }
        })
          .lean()
          .exec();
        const resourcesByIds = keyBy(resources, 'id');
        return resourcesIds.map((id: string) => resourcesByIds[id]);
      });
    };

    return allLoaders;
  }, {} as ILoaders);

  return () => loaders;
}

// const createUsersLoader = () => {
//   return new DataLoader<string, IUserDocument>(async usersIds => {
//     const users = await User.find({
//       _id: { $in: usersIds }
//     }).exec();
//     const usersByIds = keyBy(users, 'id');
//     return usersIds.map((id: string) => usersByIds[id]);
//   });
// };

// const createTodoLoader = () => {
//   return new DataLoader<string, ITodoDocument>(async todosIds => {
//     const todos = await Todo.find({
//       _id: { $in: todosIds }
//     }).exec();
//     const todosById = keyBy(todos, 'id');
//     return todosIds.map((id: string) => todosById[id]);
//   });
// };

// export const loaders = () => {
//   return {
//     users: createUsersLoader(),
//     todos: createTodoLoader()
//   };
// };
