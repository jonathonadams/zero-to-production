import { GraphQLFieldResolver } from 'graphql';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { createControllers } from '../controllers/create-controllers';

// TODO -> Move once out

// const resolver = async (rootValue, args, context, info) => {
//   -> place logic here
// }

// const exampleResolver = async (_, { destructuredProperty }, { req, user } , __ ) => {
//   -> place logic here
// }

type Resolver<T> = GraphQLFieldResolver<any, any, T>;

export function generateResolvers<T extends mongoose.Document>(
  model: mongoose.Model<T>
) {
  const controllers = createControllers<T>(model);

  const getAll: Resolver<any> = async (root, args, ctx, info) => {
    return await controllers.getAll();
  };
  const getOne: Resolver<{ id: ObjectId }> = async (
    root,
    { id },
    ctx,
    info
  ) => {
    return await controllers.getOne(id);
  };
  const createOne: Resolver<{ input: T }> = async (
    root,
    { input },
    ctx,
    info
  ) => {
    return await controllers.createOne(input);
  };

  const updateOne: Resolver<{
    input: { id: ObjectId; [property: string]: any };
  }> = async (root, { input }, ctx, info) => {
    const { id, ...values } = input;
    return await controllers.updateOne(id, values);
  };

  const removeOne: Resolver<{ id: ObjectId }> = async (
    root,
    { id },
    ctx,
    info
  ) => {
    return await controllers.removeOne(id);
  };

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    removeOne
  };
}
