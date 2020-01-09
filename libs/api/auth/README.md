# api-auth

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `ng test api-auth` to execute the unit tests via [Jest](https://jestjs.io).

Generate RS256 Private / Pub Key pair

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
