// Creates a JSON Web Key Ses route
// import Koa from 'koa';
// @ts-ignore
// import { pem2jwk } from 'pem-jwk';
const { pem2jwk, jwk2pem } = require('pem-jwk');
// const { PRIVATE_KEY, PUBLIC_KEY } = require('./rsa-keys');
const { sign, verify } = require('jsonwebtoken');
const crypto = require('crypto');
// import { PRIVATE_KEY } from '../__tests__/rsa-keys';

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
    // cipher: 'aes-256-cbc'
    // passphrase: 'top secret'
  }
});

// console.log(privateKey);
console.log(publicKey);

// https://auth0.com/docs/jwks
// https://YOUR_DOMAIN/.well-known/jwks.json

// const END_POINT = '/.well-known/jwks.json';
const KID = 'SOME-KID';

function addJsonWebKeySetRoute(rsaKey) {
  const jwk = pem2jwk(rsaKey, { alg: 'RS256', use: 'sig', kid: KID });
  // console.log(rsaPemToJwk);
  // console.log(jwk);
  // console.log(jwkp);
  // return jwkp;
  return jwk;
}

// const token = sign(
//   {
//     // Enter additional payload info here
//   },
//   privateKey,
//   {
//     algorithm: 'RS256',
//     subject: '5',
//     expiresIn: 10000,
//     issuer: 'your-company-here',
//     keyid: KID // KEY ID? RANDOM
//   }
// );

// console.log(PUBLIC_KEY);
const publicKey2 = crypto.createPublicKey(privateKey);

const pem = publicKey2.export({ format: 'pem', type: 'spki' });
console.log(pem);
console.log(privateKey);
// const a = pem2jwk(PRIVATE_KEY)
// console.log(a);
// console.log(pem2jwk(pem));
// console.log(token);

console.log(pem2jwk(publicKey));
// console.log(pem2jwk(publicKey));
