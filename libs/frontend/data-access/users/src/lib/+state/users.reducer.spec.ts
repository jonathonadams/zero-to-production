import { IUser } from '@ngw/shared/interfaces';
import { usersReducer, UsersEntityState } from './users.reducer';
import * as UserActions from './users.actions';

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
      ] as IUser[];
      const action = UserActions.loadUsersSuccess({ users });

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
      } as IUser;

      const initialState: UsersEntityState = {
        ids: [user.id],
        entities: {
          [user.id]: user
        },
        selectedUserId: null,
        authUserId: null
      };

      const userToUpdate = { id: '1', username: 'updatedName' } as IUser;
      const action = UserActions.updateUserSuccess({
        user: {
          id: userToUpdate.id,
          changes: userToUpdate
        }
      });

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
      } as IUser;

      const initialState: UsersEntityState = {
        ids: [user.id],
        entities: {
          [user.id]: user
        },
        selectedUserId: null,
        authUserId: null
      };

      const userToDelete = { id: '1' } as IUser;

      const action = UserActions.deleteUserSuccess(userToDelete);

      const result = usersReducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });
});
