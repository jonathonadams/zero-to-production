import { AuthenticationRoles } from './auth';

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: Date;
  settings: IUserSettings;
  role: AuthenticationRoles;
  active: boolean;
  hashedPassword?: string;
}

export interface IUserSettings {
  darkMode: boolean;
  colors: {
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
  };
}
