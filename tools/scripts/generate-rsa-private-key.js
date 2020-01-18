'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const crypto_1 = require('crypto');
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
    // cipher: 'aes-256-cbc',
    // passphrase: 'top secret'
  }
});
console.log(privateKey);
console.log(publicKey);
