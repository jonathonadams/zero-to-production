import { GraphQLFieldResolver } from 'graphql';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { createControllers } from '../controllers/create-controllers';
import { retrieveUserId } from '../utils';

// const resolver = async (rootValue, args, context, info) => {
//   -> place logic here
// }

// const exampleResolver = async (_, { destructuredProperty }, { req, user } , __ ) => {
//   -> place logic here
// }

type Resolver<T> = GraphQLFieldResolver<any, any, T>;

/**
 * Generates generic CRUD resolvers for a given resource
 *
 * For this to work, the inputs to each resolver must have the name "$input"
 * @param model
 * @param userResourcesOnly
 */
export function generateResolvers<T extends mongoose.Document>(
  model: mongoose.Model<T>,
  userResourcesOnly: boolean = false
) {
  const controllers = createControllers<T>(model);

  const getAll: Resolver<any> = async (root, args, ctx, info) => {
    const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
    return await controllers.getAll(userId);
  };
  const getOne: Resolver<{ id: ObjectId }> = async (
    root,
    { id },
    ctx,
    info
  ) => {
    const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
    return await controllers.getOne(id, userId);
  };
  const createOne: Resolver<{ input: T }> = async (
    root,
    { input },
    ctx,
    info
  ) => {
    const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
    return await controllers.createOne(input, userId);
  };

  const updateOne: Resolver<{
    input: { id: ObjectId; [property: string]: any };
  }> = async (root, { input }, ctx, info) => {
    const { id, ...values } = input;
    const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
    return await controllers.updateOne(id, values, userId);
  };

  const removeOne: Resolver<{ id: ObjectId }> = async (
    root,
    { id },
    ctx,
    info
  ) => {
    const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
    return await controllers.removeOne(id, userId);
  };

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    removeOne,
  };
}
