// UQT_UPDATE -> Delete this file

import { hash } from 'bcryptjs';
import Boom from '@hapi/boom';
import { DemoRegistrationControllerConfig } from './demo.interface';
import { IUser } from '@uqt/data';
import { isPasswordAllowed, userToJSON } from '../auth-utils';

export function demoSetupRegisterController({
  User,
}: DemoRegistrationControllerConfig) {
  return async (user: IUser) => {
    const password: string = (user as any).password;
    if (!password) Boom.badRequest('No password provided');

    if (!isPasswordAllowed(password))
      throw Boom.badRequest('Password does not meet requirements');

    const currentUser = await User.findByUsername(user.username);
    if (currentUser !== null)
      throw Boom.badRequest('Username is not available');

    user.hashedPassword = await hash(password, 10);

    const newUser = new User({ ...user, isVerified: false, active: true });
    await newUser.save();

    return userToJSON(newUser.toJSON());
  };
}
