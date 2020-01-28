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

export enum AuthenticationRoles {
  Admin = 0,
  User = 1,
  Organization = 2
}
