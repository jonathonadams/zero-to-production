#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const crypto_1 = require('crypto');
//https://nodejs.org/dist/latest-v13.x/docs/api/crypto.html#crypto_crypto_generatekeypairsync_type_options
// Must be one of 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
const { publicKey, privateKey } = crypto_1.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});
process.stdout.write(privateKey);
// console.log(privateKey);
// console.log(publicKey);
