import { compare, hash } from 'bcryptjs';
import Boom from '@hapi/boom';
import { signAccessToken } from '../token';
import {
  DemoLoginControllerConfig,
  DemoRegistrationControllerConfig
} from './demo.interface';
import { IUser } from '@uqt/interfaces';
import { isPasswordAllowed, userToJSON } from '../auth-utils';

export function demoSetupRegisterController({
  User
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

export function demoSetupLoginController(config: DemoLoginControllerConfig) {
  const { User } = config;
  const accessToken = signAccessToken(config);

  return async (username: string, password: string) => {
    const user = await User.findByUsername(username);

    if (!user) throw Boom.unauthorized(null, 'Bearer');

    const valid = await compare(password, user.hashedPassword as string);

    if (!valid) throw Boom.unauthorized(null, 'Bearer');

    const token = accessToken(user);

    return {
      token,
      expiresIn: config.expireTime
    };
  };
}
