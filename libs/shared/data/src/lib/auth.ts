export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedJWT {
  sub: string; // subject (id)
  exp: number; // expire time
  iat: string; // issued at time
  role: number;
}

export enum AuthenticationRoles {
  Admin = 0,
  User = 1,
  Organization = 2
}
