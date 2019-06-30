import { AuthenticationRoles } from './auth';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: Date;
  settings: UserSettings;
  role: AuthenticationRoles;
}

export interface UserSettings {
  darkMode: boolean;
  colors: {
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
  };
}
