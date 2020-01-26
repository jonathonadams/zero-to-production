## Pre-reqs

1. You will need an instance of a Mongo DB for the API to connect to (via a connection string). This is entirely up to you how/where you would like to host your DB but Mongo Atlas has a free tear that you can test with. Follow [these steps](./MONGO_ATLAS.md) to set up a DB.

2. You will need and RS256 Private Key for singing the short lived JWT access tokens. Depending on the Authentication Guard setup (see the [API Authentication Library](../libs/backend/auth/README.md)) you may or may not need the Public Key for Verifying the JWT. As the API is currently set up, the public key is auto generated from the private key at startup and served as a [JWKS](https://tools.ietf.org/html/rfc7517) at the url `/.well-know/jwks.json`. See [here](https://auth0.com/docs/tokens/concepts/jwks) for further explanation and rational.

There is a helper script in `tools/scripts/bin/generate-rsa.js` to generate an RSA256 Private Key (pkcs8)

## On Google Cloud

1. Reserve Static IP Address:
