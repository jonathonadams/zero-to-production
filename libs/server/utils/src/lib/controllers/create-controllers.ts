import Boom from '@hapi/boom';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { swapId } from '../utils';

/**
 * A helper function to create all CRUD related controllers.
 *
 * Because this function does not do any logic except to get or update
 * we use the lean() method to not create instances of mongoose documents
 * and returns the wrap document from mongoose.This means that the transform
 * functions for toObject() and toJSON() on the schemas will not get run.
 * This means we have to manually deal with the swapping of ._id and .id
 * This is manually done with a Utils helper method
 */
export function createControllers<T extends mongoose.Document>(
  model: mongoose.Model<T>
) {
  return {
    // Get All
    getAll: async (userId?: string) => {
      const resources: T[] = await model
        .find()
        .where(userId ? { userId } : {})
        .lean<T>()
        .exec();

      return resources.map<T>(swapId);
    },

    // Get an individual resource
    getOne: async (id: ObjectId, userId?: string) => {
      const resource = await model
        .findById(id)
        .where(userId ? { userId } : {})
        .lean<T | null>()
        .exec();

      if (!resource)
        throw Boom.notFound(
          'Cannot find a resource with the supplied parameters.'
        );

      return swapId<T>(resource);
    },

    // Create a Resource
    createOne: async (values: any, userId?: string | undefined) => {
      const toCreate = userId ? { ...values, userId } : values;
      return await model.create(toCreate);
    },

    // Update a resource
    updateOne: async (id: ObjectId, values: any, userId?: string) => {
      const resource = await model
        .findByIdAndUpdate(id, values, { new: true })
        .where(userId ? { userId } : {})
        .lean()
        .exec();
      if (!resource)
        throw Boom.notFound(
          'Cannot find a resource with the supplied parameters.'
        );
      return swapId<T>(resource);
    },

    // Remove one
    removeOne: async (id: ObjectId, userId?: string) => {
      const resource = await model
        .findByIdAndRemove(id)
        .where(userId ? { userId } : {})
        .lean()
        .exec();

      if (!resource)
        throw Boom.notFound(
          'Cannot find a resource with the supplied parameters.'
        );
      return swapId<T>(resource);
    }
  };
}
