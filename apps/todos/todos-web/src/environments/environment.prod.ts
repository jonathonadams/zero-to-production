// UQT_UPDATE -> change the url to point to your own API server
const serverUrl = 'http://localhost:3000';

export const environment = {
  production: true,
  serverUrl: serverUrl,
  apiBaseUrl: `${serverUrl}/api`,
  graphQLUrl: `${serverUrl}/graphql`
};
