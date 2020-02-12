// UQT_UPDATE -> change the url to point to your own API server
const serverUrl = 'https://api.zero-to-productions.dev';

export const environment = {
  production: true,
  serverUrl: serverUrl,
  apiBaseUrl: `${serverUrl}/api`,
  graphQLUrl: `${serverUrl}/graphql`
};
