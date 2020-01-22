import { InjectionToken } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const GRAPHQL_URL = new InjectionToken<string>('GraphQLUrl');

// Currently set cache to be ignored, change this as required
export function createApollo(httpLink: HttpLink, uri: string) {
  const cache = new InMemoryCache();
  return {
    link: httpLink.create({ uri }),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  };
}
