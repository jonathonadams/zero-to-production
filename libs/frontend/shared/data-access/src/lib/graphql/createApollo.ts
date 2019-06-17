import { HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

export function createApollo(
  httpLink: HttpLink,
  uri: string,
  production: boolean
) {
  const http = httpLink.create({ uri });

  const error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}`,
          `, Location: `,
          locations,
          ', Path: ',
          path
        )
      );
    }

    if (networkError) {
      console.log('[Network error]: ', networkError);
    }
  });

  return {
    link: production ? http : error.concat(http),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all'
      }
    }
  };
}
