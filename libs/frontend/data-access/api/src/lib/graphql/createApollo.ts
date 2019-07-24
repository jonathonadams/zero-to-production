import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export function createApollo(httpLink: HttpLink, uri: string) {
  const link = httpLink.create({ uri });

  // Error concatenation
  // const error = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors) {
  //     graphQLErrors.map(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}`,
  //         `, Location: `,
  //         locations,
  //         ', Path: ',
  //         path
  //       )
  //     );
  //   }

  //   if (networkError) {
  //     console.log('[Network error]: ', networkError);
  //   }
  // });

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all'
      }
    }
  };
}
