import type { Query } from 'mongoose';
/**
 * Interfaces for each of the model.
 *
 * An interface to define the constructor functions (class's with static methods)
 * and an instance interface.
 *
 * Any model used in this library must satisfy the interfaces
 */

// AuthUser Model
export interface AuthUserModel {
  new (user: any): AuthUser;
  // NOTE -> TypeScript does not currently allow derived classes to override parent static methods
  // and have different call signatures, hence User.findById should no be declared here as the return
  // signature may differ from the base implementation, i.e. Mongoose.
  findByUserId(id: string | undefined): Promise<AuthUser | null>;
  findByUsername(username: string): Promise<AuthUser | null>;
  findByEmail(email: string): Promise<AuthUser | null>;
}

// User
export interface AuthUser {
  id?: string | number;
  username: string;
  email: string;
  active: boolean;
  isVerified: boolean;
  hashedPassword?: string | undefined;
  save(): Promise<this>;
}

// Refresh Token Model
export interface RefreshModel {
  new (token: any): Refresh;
  findByToken(token: string): Promise<Refresh | null>;
  removeByToken(token: string): Promise<Refresh | null>;
  removeUserTokens(
    id: string
  ): Promise<{
    ok?: number | undefined;
    n?: number | undefined;
  }>;
  deleteById(id: string): Promise<boolean>;
}

// Refresh Token
export interface Refresh {
  id: string;
  user: AuthUser;
  token: string;
  save(): Promise<this>;
}

// Verification Token Model -  Used for email verification
export interface VerifyModel {
  new (token: any): Verify;
  findByToken(token: string): Promise<Verify | null>;
  deleteById(id: string): Promise<boolean>;
}

// Verification Token
export interface Verify {
  id: string;
  userId: AuthUser | string;
  token: string;
  save(): Promise<this>;
}

// -------------------------------------
// Interfaces for each type of
// auth configuration
// -------------------------------------

export type VerifyEmail = (email: string, token: string) => Promise<any>;
export type PasswordValidator = (password: string) => boolean;

export interface AuthModuleConfig {
  jwks?: JWKSRoute;
  authServerHost: string;
  authorize: AuthorizeController;
  register: RegisterController;
  verify: VerifyController;
  refresh: RefreshController;
  revoke: RevokeController;
}

// -------------------------------------
// Interfaces for each controller
// -------------------------------------
export interface JWKSRoute {
  publicKey: string;
  keyId: string;
}

export interface BasicRegistrationController {
  User: AuthUserModel;
  validatePassword?: PasswordValidator;
}

export interface RegisterController {
  User: AuthUserModel;
  Verify: VerifyModel;
  verifyEmail: VerifyEmail;
  validatePassword?: PasswordValidator;
}

export interface VerifyController {
  User: AuthUserModel;
  Verify: VerifyModel;
}

export interface AuthorizeController {
  access: SignAccessToken;
  refresh: RefreshToken;
  User: AuthUserModel;
  Refresh: RefreshModel;
}

export interface RefreshController {
  access: SignAccessToken;
  refresh: RefreshToken;
  Refresh: RefreshModel;
}

export interface RevokeController {
  Refresh: RefreshModel;
}

// -------------------------------------
// Interfaces for the Signing tokens & Auth Guards
// -------------------------------------
export interface SignAccessToken {
  privateKey: string;
  expireTime: number;
  issuer: string;
  audience: string;
  keyId: string;
}

// Generic interface for both Access and Refresh
export interface VerifyToken {
  issuer: string;
  audience: string;
  publicKey: string;
}

export interface VerifyJWKS {
  issuer: string;
  audience: string;
  authServerHost: string;
  allowHttp?: boolean;
}

export interface RefreshToken {
  audience: string;
  issuer: string;
  secret: string;
}

export interface ActiveUserGuard {
  User: AuthUserModel;
}

export interface AuthGuard {
  authenticate: VerifyToken | VerifyJWKS;
  activeUser: ActiveUserGuard;
}

// -------------------------------------
// Interfaces for the auth environment variables
// -------------------------------------

export interface AuthEnv {
  authServerHost: string;
  jwksRoute?: boolean;
  accessToken: {
    privateKey: string;
    publicKey?: string;
    expireTime: number;
    issuer: string;
    audience: string;
  };
  refreshToken: {
    issuer: string;
    audience: string;
    secret: string;
  };
}
