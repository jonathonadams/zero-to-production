import { IUser } from '@workspace/shared/interfaces';
import { isPasswordAllowed, userToJSON } from './auth-utils';

describe('Authentication Utils', () => {
  describe('isPasswordAllowed', () => {
    const allowedPasswords = ['asF.s0f.s'];
    const disallowedPasswords = ['', 'fffffffffff', '8888888888'];

    allowedPasswords.forEach(pwd => {
      it(`${pwd} should be allowed`, () => {
        expect(isPasswordAllowed(pwd)).toBe(true);
      });
    });
    disallowedPasswords.forEach(pwd => {
      it(`${pwd} should not be allowed`, () => {
        expect(isPasswordAllowed(pwd)).toBe(false);
      });
    });
  });

  describe('userToJson', () => {
    it('should exclude secure properties', () => {
      const safeUser = {
        id: 'abd123',
        username: 'user1',
        firstName: 'Some',
        lastName: 'User',
        emailAddress: 'user@user.com',
        dateOfBirth: new Date()
      } as IUser;

      const user = {
        ...safeUser,
        hashedPassword: 'some really long hash'
      } as IUser;

      const filteredUser = userToJSON(user);

      expect(filteredUser.id).toEqual(user.id);
      expect(filteredUser.username).toBeDefined();

      expect(filteredUser.hashedPassword).not.toBeDefined();
      expect(filteredUser).toEqual(safeUser);
    });
  });
});
