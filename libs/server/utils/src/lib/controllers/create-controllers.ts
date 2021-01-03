import type { Model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { notFound } from '@hapi/boom';
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
export function createControllers<T extends Document>(model: Model<T>) {
  return {
    // Get All
    getAll: async (userId?: string): Promise<T[]> => {
      const query = model.find();
      if (userId) query.where('userId').equals(userId);
      const resources = await query.lean().exec();

      return resources.map<T>(swapId);
    },

    // Get an individual resource
    getOne: async (id: ObjectId, userId?: string): Promise<T> => {
      const query = model.findById(id);
      if (userId) query.where('userId').equals(userId);

      const resource = await query.lean().exec();

      if (!resource)
        throw notFound('Cannot find a resource with the supplied parameters.');

      return swapId<T>(resource);
    },

    // Create a Resource
    createOne: async (values: any, userId?: string | undefined) => {
      const toCreate = userId ? { ...values, userId } : values;
      return await model.create(toCreate);
    },

    // Update a resource
    updateOne: async (
      id: ObjectId,
      values: any,
      userId?: string
    ): Promise<T> => {
      const query = model.findByIdAndUpdate(id, values, { new: true });
      if (userId) query.where('userId').equals(userId);
      const resource = await query.lean().exec();

      if (!resource)
        throw notFound('Cannot find a resource with the supplied parameters.');
      return swapId<T>(resource);
    },

    // Remove one
    removeOne: async (id: ObjectId, userId?: string): Promise<T> => {
      const query = model.findByIdAndRemove(id);
      if (userId) query.where('userId').equals(userId);

      // Don't use lean for this, pre/post hooks might require 'mongoose' object
      // to delete/update etc other resources
      const resource = await query.exec();

      if (!resource)
        throw notFound('Cannot find a resource with the supplied parameters.');
      return swapId<T>(resource);
    },
  };
}
