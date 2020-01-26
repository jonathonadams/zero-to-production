#!/usr/bin/env node
import * as process from 'process';
import { generateKeyPairSync } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
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

function base64(string: string) {
  return Buffer.from(string).toString('base64');
}
