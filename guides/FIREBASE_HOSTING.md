# Deploy your Web App with Firebase Hosting

## Before you Start

Ensure you have all the [prerequisites] completed prior to starting this guide.

## Configure App

The only configuration that is required is set the API URL to point to your cloud API.
Change `serverUrl` in `apps/todos/todos-web/src/environments/environments.prod.ts` to point to your API server.

## Analyze your build (optional)

Prior to deploying your application it is recommended to analyze the production bundle.

1. Make a production build of your application with a `stats.json`

   ```bash
   $ ng build <target> --prod --stats-json
   ```

2. Analyze the bundle with `webpack-bundle-analyzer`

   ```bash
   $ npm run bundle:analyze -- path/to/distribution/directory/stats.json
   ```

## Deploy on Firebase Hosting

1. Make a production build of your application

   ```bash
   $ ng build <target> --prod
   ```

2. **Optional**: test the production build with [Nginx & Docker]
3. Authenticate with Firebase

   ```bash
   $ firebase login
   ```

4. Initiate a new firebase project

   ```bash
   $ firebase init
   ```

5. Choose **Hosting**
6. Choose **Use an existing project** and select your desired project
7. Chose the desired output directory e.g. `dist/apps/todos/todos-web`
8. Select **yes** to configure as a single-page app
9. Select **no** to override your existing `index.html`
10. Deploy your project

    ```bash
    $ firebase deploy
    ```

## Setup Custom Domain

Follow the firebase docs to configure your [custom domain].

## Add Server Side Rendering & Service Worker

When your ready to add server side rendering follow [SSR and deploy on Firebase Functions] guide.

[prerequisites]: https://zero-to-prouction.dev/guides/getting-started
[nginx & docker]: https://github.com/jonathonadams/zero-to-production/docker/README.md
[custom domain]: https://firebase.google.com/docs/hosting/custom-domain
[ssr and deploy on firebase functions]: https://zerp-to-production/guides/ssr-firebase-functions
