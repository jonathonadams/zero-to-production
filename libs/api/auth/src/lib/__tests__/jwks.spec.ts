import { PUBLIC_KEY, PRIVATE_KEY } from './rsa-keys';
import { addJsonWebKeySetRoute } from '../routes/jwks';
import Koa from 'koa';

const app = new Koa();

const accessTokenPublicKey = PRIVATE_KEY;

describe(`JWKS`, () => {
  describe('something', () => {
    it('should register a new user', () => {
      addJsonWebKeySetRoute(accessTokenPublicKey, app);
    });
  });
});
