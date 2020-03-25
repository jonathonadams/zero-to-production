/* istanbul ignore file */

import 'jest-extended';
import { GraphQLSchema } from 'graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { runQuery, setupTestDB, newId } from './helpers';
import { signTestAccessToken } from './auth';
import { Server } from 'http';
import { Model } from 'mongoose';

// TODO -> completely refactor this

/**
 * Object.keys(object) is used to return an array of the names of object properties.
 * This can be used to create abstracted values to create the query strings
 * Example of a query string
 *
 * @param model
 * @param resourceName
 * @param resourceToCreate
 * @param resourceToUpdate
 * @param testDependents
 */
export function createGraphQLSpec<T>(
  schema: GraphQLSchema,
  tokenConfig: {
    privateKey: string;
    expireTime: number;
    issuer: string;
    keyId: string;
    audience: string;
  },
  authServer: any,
  userResource = false
) {
  return function (
    model: typeof Model,
    resourceName: string,
    resourceToCreate: any,
    resourceToUpdate: any,
    userModel?: typeof Model
  ) {
    if (!resourceToCreate || Object.keys(resourceToCreate).length === 0) {
      throw new Error(
        'Must provide an object to create with properties of at least length 1'
      );
    }

    if (!resourceToUpdate || Object.keys(resourceToUpdate).length === 0) {
      throw new Error(
        'Must provide an object to updated with properties of at least length 1'
      );
    }

    const userId = resourceToCreate.userId ? resourceToCreate.userId : newId();

    const user = {
      id: userId,
      _id: userId,
      active: true,
      isVerified: true,
      username: 'test user',
      givenName: 'test',
      surname: 'user',
      email: 'test@domain.com',
      dateOfBirth: '2019-01-01',
      hashedPassword: 'some-password-hash',
    };

    // GraphQL schemas are designed written with UpperCase names
    const upperResourceName =
      resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

    describe(`GraphQL / ${upperResourceName}`, () => {
      let mongoServer: MongoMemoryServer;
      let dbUri: string;
      let resource: T;
      let jwt: string;
      let testServer: Server;

      beforeAll(async () => {
        ({ dbUri, mongoServer } = await setupTestDB());
        testServer = await authServer.initializeServer(dbUri);
        jwt = signTestAccessToken(tokenConfig)(user);

        if (userModel) {
          await userModel.create(user);
        }

        resource = await model.create(
          userResource
            ? { ...resourceToCreate, userId: user.id }
            : resourceToCreate
        );
      });

      afterAll(async () => {
        testServer.close();
        await mongoServer.stop();
      });

      describe(`new${upperResourceName}($input: New${upperResourceName}Input!)`, () => {
        it(`should create a new ${upperResourceName}`, async () => {
          const queryName = `new${upperResourceName}`;
          const result = await runQuery(schema)(
            `
            mutation New${upperResourceName}($input: New${upperResourceName}Input!) {
              ${queryName}(input: $input) {
                id
              }
            }
          `,
            { input: resourceToCreate },
            jwt
          );

          expect(result.errors).not.toBeDefined();
          expect((result.data as any)[queryName]).toBeObject();
          expect((result.data as any)[queryName].id).toBeString();
        });
      });

      describe(`all${upperResourceName}s`, () => {
        it(`should return all ${resourceName}s`, async () => {
          const queryName = `all${upperResourceName}s`;
          const result = await runQuery(schema)(
            `
          query All${upperResourceName}{
            ${queryName} {
              id
              ${Object.keys(resourceToCreate)[0]}
            }
          }`,
            {},
            jwt
          );

          expect(result.errors).not.toBeDefined();
          expect((result.data as any)[queryName]).toBeArray();
        });
      });

      describe(`${resourceName}(id: ID!)`, () => {
        it(`should return a ${resourceName} by id`, async () => {
          const queryName = `${resourceName}`;

          const result = await runQuery(schema)(
            `{
               ${queryName}(id: "${(resource as any).id}") {
                 id
               }
             }`,
            {},
            jwt
          );

          expect(result.errors).not.toBeDefined();
          expect((result.data as any)[queryName]).toBeObject();
          expect((result.data as any)[queryName].id).toEqual(
            (resource as any).id.toString()
          );
        });
      });

      describe(`update${upperResourceName}($input: Updated${upperResourceName}Input!)`, () => {
        it(`should update an ${upperResourceName}`, async () => {
          const queryName = `update${upperResourceName}`;

          resourceToUpdate.id = (resource as any).id;

          const result = await runQuery(schema)(
            `
            mutation Update${upperResourceName}($input: Updated${upperResourceName}Input!) {
              ${queryName}(input: $input) {
                id
              }
            }
          `,
            { input: resourceToUpdate },
            jwt
          );

          expect(result.errors).not.toBeDefined();
          expect((result.data as any)[queryName]).toBeObject();
          expect((result.data as any)[queryName].id).toEqual(
            (resource as any).id.toString()
          );
        });
      });

      describe(`remove${upperResourceName}($id: ID!)`, () => {
        it(`should delete a ${upperResourceName} by id`, async () => {
          const queryName = `remove${upperResourceName}`;
          const result = await runQuery(schema)(
            `
            mutation Remove${upperResourceName}($id: ID!) {
              ${queryName}(id: $id) {
                id
              }
            }`,
            { id: (resource as any).id },
            jwt
          );

          expect(result.errors).not.toBeDefined();
          expect((result.data as any)[queryName]).toBeObject();
        });
      });
    });
  };
}
