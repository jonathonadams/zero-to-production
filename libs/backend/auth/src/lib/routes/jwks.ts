import { createPublicKey } from 'crypto';
import Koa from 'koa';
import Router from '@koa/router';
// @ts-ignore
import { pem2jwk } from 'pem-jwk';
import { JWKSRouteConfig } from '../auth.interface';

// https://auth0.com/docs/jwks
// https://YOUR_DOMAIN/.well-known/jwks.json

const END_POINT = '/.well-known/jwks.json';

export function createPublicJsonWebKeySetRouteFromPrivateKey({
  privateKey,
  keyId
}: JWKSRouteConfig) {
  return (app: Koa) => {
    const publicPem = createPublicKey(privateKey);

    const pem = publicPem.export({ format: 'pem', type: 'spki' });
    const jwk: object = pem2jwk(pem, { alg: 'RS256', use: 'sig', kid: keyId });

    const router = new Router();

    router.get(END_POINT, async ctx => {
      ctx.body = { keys: [jwk] };
    });

    app.use(router.routes());
  };
}
