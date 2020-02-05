export interface IUser {
  id: string;
  username: string;
  givenName: string;
  email: string;
  dateOfBirth: string;
  active: boolean;
  isVerified: boolean;
  hashedPassword?: string;
}
