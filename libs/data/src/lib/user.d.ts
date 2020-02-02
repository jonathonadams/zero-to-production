import { AuthenticationRoles } from './roles';

export interface IUser {
  id: string;
  username: string;
  givenName: string;
  email: string;
  dateOfBirth: string;
  role: AuthenticationRoles;
  active: boolean;
  isVerified: boolean;
  hashedPassword?: string;
}
