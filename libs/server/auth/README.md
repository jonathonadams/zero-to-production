# Backend Authentication Library

TODO

## NOTE - Delete these first

1. Delete the demo folder first. This is a simplified auth for the purpose of the demo website.
2. Remove the references from the demo directory in the [index.ts](./src/index.ts) file.
3. On the `User` model in the `core-date` library, change the unique value of the `email` property

## Configuration Options

With JWKS or without (for guards). With Refresh Token route or not

## Generate RS256 Private / Pub Key pair

- Short Lived Access Token -> If using JWKS, public key is 'auto' rotated and does not need to be deployed

## Running unit tests

Run `ng test server-auth` to execute the unit tests via [Jest](https://jestjs.io).
