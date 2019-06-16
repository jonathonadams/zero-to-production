import { User } from '@workspace/shared/data';
import { usersReducer, UsersEntityState } from './users.reducer';
import {
  LoadAllUsersSuccess,
  UpdateUserSuccess,
  DeleteUserSuccess
} from './users.actions';

describe('UsersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = usersReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadSuccess action', () => {
    it('should add the user to the user state', () => {
      const users = [
        { id: '2', username: 'someUser', emailAddress: 'some@emailAddress.com' }
      ] as User[];
      const action = new LoadAllUsersSuccess(users);

      const result = usersReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateSuccess action', () => {
    it('should update the existing user state', () => {
      const user = {
        id: '1',
        username: 'initialUser',
        emailAddress: 'some@emailAddress.com'
      } as User;

      const initialState: UsersEntityState = {
        ids: [user.id],
        entities: {
          [user.id]: user
        },
        selectedUserId: null
      };

      const userToUpdate = { id: '1', username: 'updatedName' } as User;
      const action = new UpdateUserSuccess(userToUpdate);

      const result = usersReducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteSuccess action', () => {
    it('should delete the existing user state', () => {
      const user = {
        id: '1',
        username: 'initialUser',
        emailAddress: 'some@emailAddress.com'
      } as User;

      const initialState: UsersEntityState = {
        ids: [user.id],
        entities: {
          [user.id]: user
        },
        selectedUserId: null
      };

      const userToDelete = { id: '1' } as User;

      const action = new DeleteUserSuccess(userToDelete);

      const result = usersReducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });
});
