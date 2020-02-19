# Deploy your client app Firebase Hosting

If you do not already have a Firebase account, create one at [Firebase](https://firebase.google.com/) and create your project. Additionally, make sure that firebase tools is installed. Follow the instructions [here](https://www.npmjs.com/package/firebase-tools)

## Analyze your build (Optional)

Prior to deploying your application, it is recommended to analyze the production bundle.

1. make a production build of your application with and `stats.json`

   ```bash
   ng build <target> --prod --stats-json
   ```

2. analyze the bundle with `webpack-bundle-analyzer`

   ```bash
   npm run bundle:analyze -- path/to/distribution/directory/stats.json
   ```

## Deploy on Firebase Hosting

1. make a production build of your application

   ```bash
   ng build <target> --prod
   ```

2. test the production build with (optional), guide can be found [here](../../docker/README.md)
3. authenticate with Firebase

   ```bash
   firebase login
   ```

4. instantiate a new firebase project

   ```bash
   firebase init
   ```

5. choose **Hosting**
6. choose **Use an existing project** and select your desired project.
7. chose the desired output directory e.g. `dist/apps/todos/todos-web`
8. select yest to configure as a single-page app
9. select **NO** to overwriting your existing `index.html`.
10. deploy your project

    ```bash
    firebase deploy
    ```

## Setup Custom Domain

Follow the Firebase [documentation](https://firebase.google.com/docs/hosting/custom-domain) to configure your custom domain.

## Add Server Side Rendering & Service Worker

When the you ready to add server side rendering follow [this guide](./FIREBASE_SSR.md) to add SSR and deploy on Firebase Functions.
