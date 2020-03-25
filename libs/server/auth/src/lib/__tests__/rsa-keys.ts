import { generateKeyPairSync } from 'crypto';

export const { publicKey, privateKey } = generateKeyPairs();
export const {
  privateKey: invalidPrivateKey,
  publicKey: invalidPublicKey,
} = generateKeyPairs();

function generateKeyPairs() {
  return generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      // cipher: 'aes-256-cbc',
      // passphrase: 'top secret'
    },
  });
}
