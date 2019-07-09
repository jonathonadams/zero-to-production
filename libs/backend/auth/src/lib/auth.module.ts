import { verifyToken as verifyTokenGQL } from './guards/graphql-guard';
import { verifyToken as verifyTokenRest } from './guards/rest-guard';

export class AuthModule {
  constructor(private config: any) {}

  get guards() {
    return {
      rest: {
        verifyToken: verifyTokenRest(this.config)
      },
      graphQL: {
        verifyToken: verifyTokenGQL(this.config)
      }
    };
  }
}
