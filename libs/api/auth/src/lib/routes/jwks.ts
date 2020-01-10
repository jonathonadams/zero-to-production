// Creates a JSON Web Key Ses route
import Koa from 'koa';
// @ts-ignore
import { pem2jwk } from 'pem-jwk';

// https://auth0.com/docs/jwks
// https://YOUR_DOMAIN/.well-known/jwks.json

const END_POINT = '/.well-known/jwks.json';

export function addJsonWebKeySetRoute(rsaKey: string, app: Koa) {
  const jwk: any = pem2jwk(rsaKey, { alg: 'RS256', use: 'sig' });

  console.log(jwk);
  // console.log(rsaPemToJwk);
  // console.log(jwk);
  // console.log(jwkp);

  // return jwkp;
}
