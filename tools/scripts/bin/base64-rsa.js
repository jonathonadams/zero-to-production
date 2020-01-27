#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const process = tslib_1.__importStar(require('process'));
const crypto_1 = require('crypto');
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
process.stdout.write(base64(privateKey));
function base64(string) {
  return Buffer.from(string).toString('base64');
}
