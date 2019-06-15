import { Observable, of } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { GraphQLError } from 'graphql';

// The network status is an enum with 7 all ok.
// https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts

export class GraphQLStub {
  private expectedResponse: ApolloQueryResult<any>;

  setExpectedResponse<T>(data: T): void {
    this.expectedResponse = {
      data: data,
      loading: false,
      stale: false,
      networkStatus: 7
    };
  }

  setErrorResponse(errors: GraphQLError[]): void {
    this.expectedResponse = {
      data: null,
      errors: errors,
      loading: false,
      stale: false,
      networkStatus: 7
    };
  }

  // Use for debuging only
  getExpectedResponse() {
    return this.expectedResponse;
  }

  query<T>(query: string, variables?: any): Observable<ApolloQueryResult<T>> {
    return of<ApolloQueryResult<T>>(this.expectedResponse);
  }

  mutation<T>(query: string, variables: any): Observable<FetchResult<T>> {
    return of<ApolloQueryResult<T>>(this.expectedResponse);
  }
}
