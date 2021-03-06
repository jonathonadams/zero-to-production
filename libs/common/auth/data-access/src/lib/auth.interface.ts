export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expiresIn: number;
}

export interface IRegistrationDetails {
  username: string;
  password: string;
  givenName: string;
  surname: string;
  email: string;
  dateOfBirth: string;
}

export interface IJWTPayload {
  sub: string; // subject (id)
  iss: string; // JWT issuer
  aud: string; // JWT Audience
  exp: number; // expire time
  iat: string; // issued at time
  role: number; // User role
}
