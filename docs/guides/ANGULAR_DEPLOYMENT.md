# Instructions to build and deploy your angular application on Firebase Hosting

If you do not already have a firebase account, create one at [Firebase](https://firebase.google.com/) and create your project.

## Deploy on Firebase Hosting

1. If you do not have firebase tools installed, follow the instructions [here](https://www.npmjs.com/package/firebase-tools)
2. `ng build <target> --prod`
3. Test your production build with nginx (optional), guide can be found [here](../../docker/README.md)
4. Authenticate with Firebase `firebase login`
5. Instantiate a new firebase project `firebase init`
6. Choose `Hosting`
7. Choose `Use an existing project` and select your desired project.
8. Chose the desired output directory e.g. `dist/apps/web/todos`
9. Select yest to configure as a single-page app
10. Select **NO** to overwriting your existing index.html.
11. Deploy your project `firebase deploy`
12. Follow the Firebase [documentation](https://firebase.google.com/docs/hosting/custom-domain) to configure your custom domain
