import { privateKey } from './rsa-keys';
import { createPublicJsonWebKeySetRouteFromPrivateKey } from '../routes/jwks';
import Koa from 'koa';

const app = new Koa();

// TODO
describe(`JWKS`, () => {
  describe('something', () => {
    it('should register a new user', () => {
      createPublicJsonWebKeySetRouteFromPrivateKey(privateKey, '123', app);
    });
  });
});
