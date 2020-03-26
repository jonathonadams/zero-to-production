#!/usr/bin/env node
import { generateKeyPairSync } from 'crypto';
//https://nodejs.org/dist/latest-v13.x/docs/api/crypto.html#crypto_crypto_generatekeypairsync_type_options

// Must be one of 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

console.log(privateKey);
console.log(publicKey);
