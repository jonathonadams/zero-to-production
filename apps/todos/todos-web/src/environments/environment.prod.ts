// UQT_UPDATE -> change the url to point to your own API server
const serverUrl = 'https://fns.zero-to-production.dev';

export const environment = {
  production: true,
  serverUrl: serverUrl,
  apiBaseUrl: `${serverUrl}/api`,
  graphQLUrl: `${serverUrl}/graphql`,
};
