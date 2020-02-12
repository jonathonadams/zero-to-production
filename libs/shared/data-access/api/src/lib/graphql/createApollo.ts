import { InjectionToken } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const GRAPHQL_URL = new InjectionToken<string>('GraphQLUrl');

// Currently set cache to be ignored, change this as required
export function createApollo(httpLink: HttpLink, uri: string) {
  const cache = new InMemoryCache({
    dataIdFromObject: o => o.id,
    addTypename: true
  });

  return {
    link: httpLink.create({ uri }),
    cache,
    connectToDevTools: false
  };
}
