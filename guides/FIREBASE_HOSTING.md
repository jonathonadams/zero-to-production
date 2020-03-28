# Deploy your Web App with Firebase Hosting

## Before you Start

Ensure you have all the [prerequisites] completed prior to starting this guide.

## Configure App

The only configuration that is required is configure the API url to point to your cloud API (if you have not done so already).
Change `serverUrl` in `apps/todos/todos-web/src/environments/environments.prod.ts` to point to your API server.

## Analyze your build (Optional)

Prior to deploying your application, it is recommended to analyze the production bundle.

1. make a production build of your application with and `stats.json`

   ```bash
   $ ng build <target> --prod --stats-json
   ```

2. analyze the bundle with `webpack-bundle-analyzer`

   ```bash
   $ npm run bundle:analyze -- path/to/distribution/directory/stats.json
   ```

## Deploy on Firebase Hosting

1. make a production build of your application

   ```bash
   $ ng build <target> --prod
   ```

2. **optional**: test the production build with [Nginx & Docker]
3. authenticate with Firebase

   ```bash
   $ firebase login
   ```

4. instantiate a new firebase project

   ```bash
   $ firebase init
   ```

5. choose **Hosting**
6. choose **Use an existing project** and select your desired project.
7. chose the desired output directory e.g. `dist/apps/todos/todos-web`
8. select yest to configure as a single-page app
9. select **NO** to overwriting your existing `index.html`.
10. deploy your project

    ```bash
    $ firebase deploy
    ```

## Setup Custom Domain

Follow the firebase docs to configure your [custom domain].

## Add Server Side Rendering & Service Worker

When your ready to add server side rendering follow [SSR and deploy on Firebase Functions] guide.

[prerequisites]: https://zero-to-prouction.dev/guides/getting-started
[nginx & docker]: https://github.com/unquenchablethyrst/zero-to-production/docker/README.md
[custom domain]: https://firebase.google.com/docs/hosting/custom-domain
[ssr and deploy on firebase functions]: https://zerp-to-production/guides/ssr-firebase-functions
