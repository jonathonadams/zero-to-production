import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { runQuery, setupTestDB } from '@app-testing/backend/helpers';
import { IUserDocument, IUser } from '@workspace/shared/interfaces';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { signTestAccessToken } from '@app-testing/backend/auth';
import { User } from './user.model';
import { schema } from '../graphql';
import config from '../../../environments';

const user = ({
  username: 'test user',
  firstName: 'test',
  lastName: 'user',
  emailAddress: 'test@domain.com',
  dateOfBirth: '2019-01-01',
  password: 'asF.s0f.s',
  hashedPassword: 'asF.s0f.s',
  role: 0,
  settings: {
    darkMode: false
  }
} as any) as IUser;

const updatedUser = { username: 'updated user' };

// ----------------------------------
// GraphQL API tests
// ----------------------------------
describe(`GraphQL / User`, () => {
  // let connection: mongoose.Connection;
  let mongoServer: MongoMemoryServer;
  let db: mongoose.Mongoose;
  let createdUser: IUserDocument;
  let jwt: string;

  beforeAll(async () => {
    ({ db, mongoServer } = await setupTestDB());

    createdUser = await User.create(user);
    [createdUser.id, createdUser._id] = [createdUser._id, createdUser.id];
    jwt = signTestAccessToken(createdUser, config.secrets.accessToken);
  });

  afterAll(async () => {
    await db.disconnect();
    await mongoServer.stop();
  });

  describe(`allUsers`, () => {
    it(`should return all Users`, async () => {
      const queryName = `allUsers`;
      //language=GraphQL
      const result = await runQuery(schema)(
        `
        {
          ${queryName} {
            id
            username
          }
        }`,
        {},
        jwt
      );

      expect(result.errors).not.toBeDefined();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName]
      ).toBeArray();
    });
  });

  describe(`User(id: ID!)`, () => {
    it(`should return a User by id`, async () => {
      const queryName = `User`;

      const result = await runQuery(schema)(
        `
      {
        ${queryName}(id: "${createdUser.id}") {
          id
        }
      }`,
        {},
        jwt
      );

      expect(result.errors).not.toBeDefined();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName]
      ).toBeObject();
      expect((result.data as ExecutionResultDataDefault)[queryName].id).toEqual(
        createdUser.id.toString()
      );
    });
  });

  describe(`register($input: NewUserInput!)`, () => {
    it(`should create a new User`, async () => {
      const differentUser = {
        ...user,
        username: 'A different user',
        emailAddress: 'someDifferent@email.com'
      };
      delete differentUser['role'];
      delete differentUser['hashedPassword'];

      const queryName = `register`;
      const result = await runQuery(schema)(
        `
      mutation Register($input: NewUserInput!) {
        ${queryName}(input: $input) {
          id
          username
        }
      }
    `,
        { input: differentUser },
        jwt
      );

      expect(result.errors).not.toBeDefined();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName]
      ).toBeObject();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName].id
      ).toBeString();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName].username
      ).toEqual(differentUser.username);
    });
  });

  describe(`updateUser($input: UpdatedUserInput!)`, () => {
    it(`should update an User`, async () => {
      const queryName = `updateUser`;

      (updatedUser as any).id = createdUser.id;

      const result = await runQuery(schema)(
        `
          mutation UpdateUser($input: UpdatedUserInput!) {
            ${queryName}(input: $input) {
              id
            }
          }
        `,
        { input: updatedUser },
        jwt
      );

      expect(result.errors).not.toBeDefined();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName]
      ).toBeObject();
      expect((result.data as ExecutionResultDataDefault)[queryName].id).toEqual(
        createdUser.id.toString()
      );
    });
  });

  describe(`removeUser($id: ID!)`, () => {
    it(`should delete a User by id`, async () => {
      const tempUser = {
        ...createdUser.toJSON(),
        role: AuthenticationRoles.Admin
      };

      const jwtToken = signTestAccessToken(
        tempUser,
        config.secrets.accessToken
      );

      const queryName = `removeUser`;
      const result = await runQuery(schema)(
        `
          mutation RemoveUser($id: ID!) {
            ${queryName}(id: $id) {
              id
            }
          }`,
        { id: createdUser.id },
        jwtToken
      );

      expect(result.errors).not.toBeDefined();
      expect(
        (result.data as ExecutionResultDataDefault)[queryName]
      ).toBeObject();
    });
  });
});
