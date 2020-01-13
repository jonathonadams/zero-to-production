import { publicKey, privateKey } from './rsa-keys';
import { addJsonWebKeySetRoute } from '../routes/jwks';
import Koa from 'koa';

const app = new Koa();

describe(`JWKS`, () => {
  describe('something', () => {
    it('should register a new user', () => {
      addJsonWebKeySetRoute(publicKey);
    });
  });
});
