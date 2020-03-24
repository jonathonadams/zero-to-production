import { ParameterizedContext } from 'koa';
import Router from '@koa/router';
import { Document, Model } from 'mongoose';
import { createControllers } from './create-controllers';
import { retrieveUserId } from './utils';

export function generateRestRouter<T extends Document>({
  model,
  userResourcesOnly = false
}: {
  model: Model<T>;
  userResourcesOnly?: boolean;
}) {
  const router = new Router();
  const controllers = generateRestControllers<T>(model, userResourcesOnly);

  router.param('id', controllers.params);

  router.get('/', controllers.getAll).post('/', controllers.createOne);

  router
    .get('/:id', controllers.getOne)
    .put('/:id', controllers.updateOne)
    .delete('/:id', controllers.removeOne);

  return router;
}

export function generateRestControllers<T extends Document>(
  model: Model<T>,
  userResourcesOnly: boolean
) {
  const controllers = createControllers<T>(model);

  return {
    params: async (
      id: string,
      ctx: ParameterizedContext,
      next: () => Promise<any>
    ) => {
      ctx.state.id = id;
      await next();
    },
    getAll: async (ctx: ParameterizedContext) => {
      const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
      ctx.status = 200;
      ctx.body = await controllers.getAll(userId);
    },
    getOne: async (ctx: ParameterizedContext, next: () => Promise<any>) => {
      const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
      ctx.status = 200;
      ctx.body = await controllers.getOne(ctx.state.id, userId);
    },
    createOne: async (ctx: ParameterizedContext, next: () => Promise<any>) => {
      const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
      ctx.status = 201;
      ctx.body = await controllers.createOne((ctx.request as any).body, userId);
    },
    updateOne: async (ctx: ParameterizedContext, next: () => Promise<any>) => {
      const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
      ctx.status = 201;
      ctx.body = await controllers.updateOne(
        ctx.state.id,
        (ctx.request as any).body,
        userId
      );
    },
    removeOne: async (ctx: ParameterizedContext, next: () => Promise<any>) => {
      const userId = userResourcesOnly ? retrieveUserId(ctx) : undefined;
      ctx.status = 200;
      ctx.body = await controllers.removeOne(ctx.state.id, userId);
    }
  };
}
