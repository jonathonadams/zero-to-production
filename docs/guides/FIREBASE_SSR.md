# Angular Universal with Firebase Functions

While deploying your SSR application is pretty straight forward there are a couple of gotchas that need to be understood and configured.

As it stands, Firebase tools is not really built to work nicely with Monorepos. By default if you run `firebase init` and select cloud functions (TS or JS), it will create a `functions/` directory at the root of your project. It will also create a `package.json` that lists build scrips, dependencies and most importantly the entry point to your functions via the `main` field. It will also prompt you to install dependencies that will be installed **INSIDE** the `functions/` directory, which you do **NOT** want.

It is important to understand that the reason the `package.json` is added inside the `functions` directory is that when you deploy you functions with `firebase deploy`, firebase tools will deploy the entire contends of the `functions/` directory to firebase (including the `package.json`), install dependencies with `npm i`, run any commands listed under the `predeploy` field under the `functions` field in `firebase.json` then run the entry file designated in the `main` field in the `package.json`. Note that the scripts listed in the `predeploy` are those listed in the `package.json` file inside of the `functions/` directory.

Although by default the directory that is deployed is the `functions/` directory, this can be configured in `firebase.json` (see below). Currently only one deployment directory can be specified and only one `firebase.json` file is supported so if you had more than one project in the repo that was to be deployed then you may have to create a build script that swaps out `firebase.json` files based on targets. See [#590] & [#1115] for further details. Effectively if you want anything to be deployed to Firebase functions it must be inside of the specified directory.

## Add Angular Universal

With all that being said, for this example we are going to deploy the `todos` application using Angular Universal SSR. It is advised to read through the [Angular Universal] guide to help understand the complexity and Angular Universal is hiding for you. You will learn along the way that the some of the limitations of using SSR are obvious with the `todos` app and the decision to use SSR is not always straight forward.

### 1. Add & Configure Angular Universal for the Todo Application

Add angular universal to the Todos Application with the express engine schematics.

```bash
ng add @nguniversal/express-engine --clientProject todos-web
```

A number of files are created and edited as per [Angular Universal however note the following:

- `AppModule`: the imported `BrowserModule` now calls `withServerTransition({appId: 'serverApp'})`. Change `serverApp` to something like `todoApp`.
- `server.ts`: there will be some errors, one because of our typescript configuration and a type definition mismatch. Change the following two statements.

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
      bootstrap: AppServerModule
    })
  );

  // to
  server.engin(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule
    }) as any // stop typescript error
  );
  ```

Some additional build targets in `angular.json` and scripts in `package.json` have been added. Notice that the `outputPath` has been altered for the app. The browser build now outputs to the `browser` and the new server build outputs to `server`

In the `server.ts` file, take note of the currently set distribution folder

```typescript
const distFolder = join(process.cwd(), 'dist/todos-web/browser');
```

Note that it is pointing to the output directory of the browser build and that it is in relation to current working directory. While fine for testing, the will be altered later when configuring for Firebase functions.

### 2. Test SSR is working.

Test that SSR is working correctly by opening an incognito browser window and disable JavaScript in the developers console so that we can see the server rendered application only. Then run:

```bash
npm run dev:srr
```

Once compiled visit `http://localhost:4200` to access your App. The normal `login` page should be shown. If you try to login, nothing will happen. Because our JS can not bootstrap once loaded, things like reactive forms etc will not work.

Now open another incognito window and try again. All functionality should work as normal. Locally it will almost be too quick to notice but once the `.js` bundles loaded and the client application bootstrapped in transitions from the server rendered. You can tell by checking `inspect source` and the see that the original response the the server rendered markup.

The todo application might not be benefit hugely from SSR in some aspects (JS disabled, your site might). Eg the [demo site] mostly will work without JS enabled, try it out.

Word of warning - If you access browser API's (such as `localStorage`) these may throw errors in the server rendered application depending on when you access them. Ensure to check what platform the application is currently running on when the API is accessed.

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

Because of the limitations of the Firebase Cli as discussed above, there is some setup required to make it work nicely with our Monorepo structure. Rather than create and setup the files manually, a workspace schematic is provided in `tools/schematics/` to scaffold a new _functions_ project and modify our Todos application. To run the schematic run the following. The Firebase project name is found in `.firebaserc`.

```bash
npx nx workspace-schematic universal-firebase --clientProject=todos-web --firebaseProject=<your-firebase-project-name>
```

This will create a new project in `apps/todos/todos-web-functions`. Copy and paste the following into the `firebase.json` file.

```json
{
  "hosting": {
    "public": "apps/todos/todos-web-functions/dist/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "src/",
      "tslint.json",
      "tsconfig.json",
      "tsconfig.spec.json"
    ],
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
  },
  "functions": {
    "source": "apps/todos/todos-web-functions"
  }
}
```

## What has the schematic done?

The schematic has taken care of scaffolding and configuring the Universal Application and has configured the following. A new `todos-web-functions` project has been added to the `angular.json`.

When you deploy the functions only resources packaged inside the projects directory (`apps/todos/todos-web-functions`) are pushed so the project is configured to build into a `dist` directory **inside** the project directory, i.e. `apps/todos/todos-web-functions`. This means the **current working directory** of the server process will be different when hosted on cloud functions and the `distFolder` has been altered to reflect.

```typescript
// this
const distFolder = join(process.cwd(), 'dist/todos-web/browser');

// has now become this
const distFolder = join(process.cwd(), 'dist/browser');
```

Along with the normal cli targets, `ng build|test|lint <project>`, an additional target `build-all` (& `build-all:production`) have been added. This will build the functions as well as both the client app and server side bundle into the functions `dist/` directory. Specifically, the client app is build with `functions` target, e.g `todos-web:build:functions`.

The `functions` build target looks like the below:

```json
"functions": {
  "outputPath": "apps/todos/todos-web-functions/dist/browser",
  "index": "apps/todos/todos-web/src/index.original.html",
  "baseHref": "/<your-firebase-project>/us-central1/universal/"
}
```

- **outputPath**: Builds the client bundle into the `todos-web-functions` directory for testing / deployment

* **index**: Use the `index.original.html` generated by the schematic in place of `index.html`.

  The current rewrite rules would indicate that if a resource was accessed with a `*.html` extension then it would be served via the cloud function.

  ```json
  // firebase.json
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
ng serve todos-web-functions
```

Note: this is a combination of building all projects for local serving, `ng run todos-web-functions:build-all`, and serving with `firebase serve`

When ready for deployment, make a production build:

```bash
ng run todos-web-functions:build-all:production
```

and deploy your application as normal:

```bash
firebase deploy
```

## Setup Custom Domain

If you have not set up a custom domain your functions will most probably not serve properly due to the `baseHref` as described earlier. If you have not all ready, follow the Firebase docs to configure your [custom domain].

## Add a Service Worker (Optional)

While not directly associated with server side rendering, a Service Worker plays nicely with a server rendered application. The SSR application is rendered first and the client application bootstraps once all resources are loaded. Once the client application bootstraps it will activate the service worker and cache all resources. On next visit the service worker will serve the cached client files before any request are made and the application will load instantly. In the background go and check for updated resources and update as necessary. See here for more details on the [Angular Service Worker].

```bash
ng add @angular/pwa --project todos-web
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
    "index": "/index.original.html", <- change this
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
ng run todos-web:build:production,functions
```

serve locally to test:

```bash
firebase serve
```

Visit the locally hosted url to test your app. The server side app should load as normal and the client app will bootstrap once all resources are loaded.

Refresh the browser and the app should load almost instantly as the service worker served the locally cached files. Now turn the network off and see what happens:

`Dev Tools` &rarr; `Network` &rarr; `Online/Offline`

Refresh the browser with hte network turned off and you should still get the same result and the application will now work offline.

### Considerations

Not every applications will benefit from all aspects of server side rendering, specifically the time to first paint. Depending on the traffic load, cloud functions will go to sleep/idle if infrequently used and the the "cold start" time may cause your app to load slower.

[#590]: https://github.com/firebase/firebase-tools/issues/590
[#1115]: https://github.com/firebase/firebase-tools/issues/1115
[angular universal]: https://angular.io/guide/universal
[demo site]: https://zero-to-production.dev
[custom domain]: https://firebase.google.com/docs/hosting/custom-domain
[angular service worker]: https://angular.io/guide/service-worker-intro
