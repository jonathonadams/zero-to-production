# Angular Universal with Firebase Functions

## Before you Start

Ensure you have all the [prerequisites] setup and ready prior to starting this guide.

## Firebase Tools

// TODO -> Reword
While deploying your SSR application is pretty straight forward there are a couple of TODO tips gotchas that need to be understood and configured.

As it stands, Firebase tools is not really built to work nicely with Monorepos. By default, if you run `firebase init` and select cloud functions (TS or JS) it will create a `functions/` directory at the root of your project. It will also create a `package.json` inside the `functions/` directory that lists build scripts, dependencies and most importantly the entry point to your functions via the `main` field. It will also prompt you to install required dependencies **inside** the `functions/` directory which you do **not** want.

It is important to understand that the reason the `package.json` is added inside the `functions/` directory is that when you deploy your functions with `firebase deploy`, firebase tools will deploy the entire contents of the `functions/` directory. Firebase will then install all dependencies, run any commands listed under the `predeploy` field under the `functions` field in `firebase.json` and then run the entry file designated in the `main` field in the `package.json`. Note that the scripts listed in the `predeploy` are those listed in the `package.json` file inside of the `functions/` directory. Effectively if you want anything to be deployed to [Firebase Functions] it must be inside of the specified directory.

Although by default the directory that is deployed is the `functions/` directory, this can be configured in `firebase.json` (see below). Currently only one deployment directory can be specified and only one `firebase.json` file is supported. See [#590] & [#1115] for further details.

The limitation of the single `firebase.json` can be worked around with the help of **Angular CLI Builders** as seen below.

## Add Angular Universal

With all that being said this guide will walk through deploying the `todos-web` application using Angular Universal SSR. It is advised to read through the [Angular Universal] guide to help understand the complexity that Angular Universal is taking care of for you. Some of the limitations of using SSR will become apparent with the `todos` app and the decision to use SSR is not always straight forward.

### 1. Add & Configure Angular Universal for the Todo Application

Add angular universal to the Todos Application with the express engine schematics.

```bash
$ ng add @nguniversal/express-engine --clientProject todos-web
```

A number of files are created and edited as per the docs at [Angular Universal], however note the following:

- `AppModule`: the imported `BrowserModule` now calls `withServerTransition({appId: 'serverApp'})`. Change `serverApp` to something like `todoApp`.
- `server.ts`: there will be some errors because of the TypeScript configuration and a type definition mismatch. Change the following two statements.

  ```typescript
  // change
  import * as express from 'express';
  // to
  import express from 'express';

  // At the time of writing, the express engine had a type definition
  // mismatch and 'strict' mode was showing as an error.
  // This may have been fixed and may not be needed.
  // If so, ignore the next part and let me know.

  // change
  server.engin(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  // to
  server.engin(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }) as any // stop typescript error
  );
  ```

Some additional build targets in `angular.json` and scripts in `package.json` have been added. Notice that the `outputPath` has been altered for the app. The browser build now outputs to the `browser` directory and the new server build outputs to `server` directory.

In the `server.ts` file take note of the distribution folder

```typescript
const distFolder = join(process.cwd(), 'dist/todos-web/browser');
```

Note that it is pointing to the output directory of the browser build and that it is assumes the current working directory is the root directory. While this is fine initially, the path will be altered later when configuring for Firebase functions.

### 2. Test SSR is working

Test that SSR is working correctly by opening an incognito browser window and **disable JavaScript** (ctrl + shift + p in the developers console) so that we can see the server rendered application only. Then run to server.

```bash
$ npm run dev:srr
```

Once compiled, visit `http://localhost:4200` to access your application. The normal `login` page should be shown. If you try to login, nothing will happen. Because JavaScript can not bootstrap some features will not work, e.g. forms.

Open another incognito window and try again. All functionality should work as normal. It will almost be too quick to notice the server rendered output when run locally but once the `.js` bundles load the client application bootstraps and transitions from server rendered to client rendered. To view the original server rendered markup right click & `inspect source`.

While the Todo application might have limited benefits for SSR, your application might i.e only part of the application might require authentication. The 'examples' application (this site) mostly will work without JavaScript enabled, try it out.

A word of warning - If you access browser API's (such as `localStorage`) these will throw errors in the server rendered application depending on when you access them. Ensure to check what platform the application is currently running on when the API is accessed.

```typescript
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

someMethod() {
  if (isPlatformBrowser(this.platformId)) {
    // safe to access browser API's
    const foo: any = localStorage.getItem('foo');
  }
}

```

## Initialize & Configure Firebase Functions

Because of the limitations of the Firebase Cli as discussed above, there is some setup required to make it work nicely with the Monorepo structure. Rather than create and setup the files manually, a workspace schematic is provided in `tools/schematics/` to scaffold a new _functions_ project and modify our Todos application. To run the schematic run the following:

```bash
$ npx nx workspace-schematic universal-firebase --clientProject=todos-web --firebaseProject=<your-firebase-project-name>
```

The Firebase project option is the project name as listed on Firebase.

This will create a new project in `apps/todos/todos-web-functions`.

If a firebase project has previously been initialized, a `firebase.json` file should be present in the root directory. These files can now be deleted as they are not needed.

## What has the schematic done?

The schematic has taken care of scaffolding and configuring the Universal Application and has added a new `todos-web-functions` project.

When you deploy to Firebase only resources packaged inside the project directory (`apps/todos/todos-web-functions`) are published so the project is configured to build into a `dist/` directory **inside** the source directory, i.e. `apps/todos/todos-web-functions/dist/`. This means the **current working directory** of the server process (`server.ts`) will be different when hosted on cloud functions and the `distFolder` inside `server.ts` has been altered to reflect the new current working directory.

```typescript
// server.ts
// this
const distFolder = join(process.cwd(), 'dist/todos-web/browser');

// has now become this
const distFolder = join(process.cwd(), 'dist/browser');
```

Along with the normal Angular Cli targets, **`ng build|test|lint <project>`**, additional targets have been added.

// CONTINUE FROM HERE

- **`build-all`** (& **`build-all:production`**): this will build the functions as well as both the client app and server side bundle into the functions `dist/` directory. Specifically, the client app is build with `functions` target, e.g `todos-web:build:functions`.
- **`run`**: sets the CWD to the project src directory (i.e. `apps/todos/todos-web-functions`) and executes
  ```bash
  $ firebase server --project <your-firebase-project>
  ```
- **`serve`**: executes `build-all` and `run`
- **`deploy`**: sets the CWD the project src directory (i.e. `apps/todos/todos-web-functions`) and executes.
  ```bash
  $ firebase deploy --project <your-firebase-project>
  ```
- **`build-and-deploy`**: runs a production build and deploys.

Additionally a **`functions`** build target has been added to the client project as below.

```json
// examples-web > architect > build > configurations

"functions": {
  "outputPath": "apps/todos/todos-web-functions/dist/browser",
  "index": "apps/todos/todos-web/src/index.original.html",
  "baseHref": "/<your-firebase-project>/us-central1/universal/"
}
```

- **outputPath**: Builds the client bundle into the `todos-web-functions` directory for testing / deployment

* **index**: Use the `index.original.html` generated by the schematic in place of `index.html`.

  The current rewrite rules in the generated `firebase.json` in the new functions project would indicate that if a resource was accessed with a `*.html` extension then it would be served via the cloud function.

  ```json
  // apps/todos/todos-web-functions/firebase.json

  "rewrites": [
    {
      "source": "**/*.@(js|css|svg)",
      "destination": "/index.html"
    },
    {
      "source": "**",
      "function": "universal"
    }
  ]
  ```

  That is not the case however. Irrespective of the rewrite rules Firebase will **always** serve an `index.html` file if present in the hosting directory. The Universal Server if configured to serve an `index.original.html` instead of an `index.html` if it is found in the client directory. All other static resources are served from the hosting directory.

  ```ts
  // server.ts
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
  ```

- **baseHref**: For local testing **only**, running `firebase serve` will serve the function at `http://localhost:5001/<your-firebase-project>/us-central1/universal/`. If the `baseHref` is set to `/` (default), all static assets will fail to load. When building for production this is overridden by production target.

  Note: For the `baseHref` property to be applied at build time, resource must be loaded relatively.

  ```html
  <!-- will NOT work -->
  <img src="assets/images/github-white.svg" alt="(opens GitHub repo)" />

  <!-- will work -->
  <img src="./assets/images/github-white.svg" alt="(opens GitHub repo)" />
  ```

## Try it out

Serve the Firebase function locally:

```bash
$ ng serve todos-web-functions
```

When ready for deployment, make a production build:

```bash
$ ng run todos-web-functions:build-all:production
```

and deploy your application as normal:

```bash
$ ng run todos-web-functions:deploy
```

Note: The above two commands can be combined by running

```bash
$ ng run todos-web-functions:build-and-deploy
```

## Setup Custom Domain

If you have not set up a custom domain your functions will most probably not serve properly due to the `baseHref` as described earlier. If you have not all ready, follow the Firebase docs to configure your [custom domain].

## Add a Service Worker (Optional)

While not directly associated with server side rendering, a Service Worker plays nicely with a server rendered application. The SSR application is rendered first and the client application bootstraps once all resources are loaded. Once the client application bootstraps it will activate the service worker and cache all client resources. On next visit the service worker will serve the cached client files before any request are made and the application will load instantly. See here for more details on the [Angular Service Worker].

```bash
$ ng add @angular/pwa --project todos-web
```

There are two thing that need to be configured to make the service worker work with the Universal Application.

- The **pwa** schematic will alter the `index.html` file but not the `index.original.html`. Add the additional tags manually, they will look something like the below:

  ```html
  <link rel="manifest" href="manifest.webmanifest" />
  <meta name="theme-color" content="#1976d2" />
  ```

- Change the default configuration of the `ngsw-config.json` to account for the SSR application serving `index.original.html` so that the hashes will match and work offline as expected.

  ```json
  {
    ...
    "index": "/index.original.html", <- change to this
    "assetGroups": [
      {
        ...
        "files": [
          "/favicon.ico",
          "/index.html",
          "/index.original.html", <- add this
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
  ```

The service worker will only run in production mode so rebuild the client application in production mode including the firebase configuration. Note the build configuration order matters as this will create a production build but the `baseHref` property from the `functions` target will override the 'baseHref' from the production target for local testing.

```bash
$ ng run todos-web:build:production,functions
```

serve locally to test:

```bash
$ ng run todos-web:run
```

Visit the locally hosted url to test your app. The server side app should load as normal and the client app will bootstrap once all resources are loaded.

Refresh the browser and the app should load almost instantly as the service worker served the locally cached files. Now turn the network off and see what happens:

`Dev Tools` &rarr; `Network` &rarr; `Online/Offline`

Refresh the browser with the network turned off and you should still get the same result and the application will now work offline.

### Considerations

Not every applications will benefit from all aspects of server side rendering, specifically the time to first paint. Depending on the traffic load, if the function is not "hot" the cold start of a may cause your app to load slower significantly slower than a non SSR rendered application.

[prerequisites]: https://zero-to-prouction.dev/guides/getting-started
[#590]: https://github.com/firebase/firebase-tools/issues/590
[#1115]: https://github.com/firebase/firebase-tools/issues/1115
[angular universal]: https://angular.io/guide/universal
[demo site]: https://zero-to-production.dev
[custom domain]: https://firebase.google.com/docs/hosting/custom-domain
[angular service worker]: https://angular.io/guide/service-worker-intro
[firebase functions]: https://firebase.google.com/products/functions
