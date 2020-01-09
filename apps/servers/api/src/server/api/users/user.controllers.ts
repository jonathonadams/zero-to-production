import { ParameterizedContext } from 'koa';
import Boom from '@hapi/boom';
import { swapId } from '@uqt/api/utils';
import { User } from './user.model';
import { IUser } from '@uqt/interfaces';

export async function params(
  id: string,
  ctx: ParameterizedContext,
  next: () => Promise<any>
): Promise<void> {
  ctx.state.id = id;
  await next();
}

// Get All
export async function getAll(ctx: ParameterizedContext): Promise<void> {
  ctx.status = 200;
  const resources = await User.find({})
    .lean<IUser[]>()
    .exec();

  ctx.body = resources.map(swapId);
}

// Get an individual user
export async function getOne(ctx: ParameterizedContext): Promise<void> {
  const user = await User.findById(ctx.state.id)
    .lean<IUser>()
    .exec();

  if (!user)
    throw Boom.notFound('Cannot find a user with the supplied parameters.');

  ctx.status = 200;
  ctx.body = swapId(user);
}

// Create a Resource
export async function createOne(ctx: ParameterizedContext): Promise<void> {
  ctx.status = 201;
  ctx.body = await User.create(ctx.request.body);
}

// Update a user
export async function updateOne(ctx: ParameterizedContext): Promise<void> {
  const updatedUser = await User.findByIdAndUpdate(
    ctx.state.id,
    ctx.request.body,
    { new: true }
  )
    .lean<IUser>()
    .exec();

  if (!updatedUser)
    throw Boom.notFound('Cannot find a user with the supplied parameters.');

  ctx.status = 201;
  ctx.body = swapId(updatedUser);
}

// Remove one
export async function removeOne(ctx: ParameterizedContext): Promise<void> {
  const removedUser = await User.findByIdAndDelete(ctx.state.id)
    .lean<IUser>()
    .exec();

  if (!removedUser)
    throw Boom.notFound('Cannot find a user with the supplied parameters.');

  ctx.status = 200;
  ctx.body = swapId(removedUser);
}
