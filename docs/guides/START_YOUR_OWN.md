# Start You Own Monorepo

If you want to use this repo as the foundation for your own Monorepo then follow these steps to re-brand and tidy up the repo.

## Housekeeping

1. change `package.json` fields as required, e.g. `name`, `license`, `version`.
2. change the application prefix by doing a `search and replace` for **`uqt`** and replace with your desired app prefix.
3. delete `CODE_OF_CONDUCT.md` and `LICENSE.md` files.
4. create you own color theme in `/libs/theme/theme.scss`
5. delete the `firebase.json` file in the root directory (you will create your own when you deploy your Angular application)

## Remove "Examples" Project (Optional)

The "Examples" project is all projects and libs corresponding to the demo website at [zero-to-production.dev](https://zero-to-production.dev).

6. delete the "Examples" application in `apps/examples/*`
7. delete all libs corresponding to the "Examples" application at `libs/examples/*`
8. delete all projects and libraries in the `angular.json` that begin with `examples-`
9. delete the same projects from the `nx.json` file.
10. delete all TypeScript path `@aliases` referencing `examples` apps or libs in `tsconfig.json`
11. remove the `scope:examples` rule from `nx-enforce-module-boundaries` in `tslint.json`


    ```JavaScript
    // tslint.json

    "nx-enforce-module-boundaries": [
    ...
    // delete these lines
      {
        "sourceTag": "scope:shared",
        "onlyDependOnLibsWithTags": ["scope:shared"]
      }
    ```

12. uninstall unused /unwanted npm packages

    ```bash
    npm uninstall <package>
    ```

    - `prismjs`
    - `@angular/service-worker`
    - `@angular/platform-server`

## Configure the Application (Important)

In some parts of the apps / libs they have been configured specifically for the [zero-to-production.dev](https://zero-to-production.dev) such as configuring the `User` model to not require unique emails. These places have been marked and commented on what to do.

To find and configure them, in your IDE do a search for `UQT_UPDATE` and configure as per the comments.

## Local Development

Local development is relatively simple.

To serve the Angular Todo application run `ng serve`.

To get the API up and running follow the below.

- crete a local MongoDB server. The [docker cheat-sheet](./DOCKER_CHEAT_SHEET.md) shows how to create with docker.
- create a `.env` file for environment variables. Copy and rename `.sample.env` to `.env` located in `apps/server/api` and set your desired environment variables.
- `ng serve server-api` will run the server

**WARNING** - Do NOT use the `RSA256` private keys that are in `.sample.env` as they are public and not secure, they are just demonstrating how to set them in the `.env` file.

## Deploy your project

Now that you have cloned, re-branded and cleaned up your Monorepo, it's time to deploy.

First, deploy your API server. Follow the [Google Cloud](./GOOGLE_CLOUD.md) guide to deploy your API server on GC Kubernetes Engine. (AWS Lamda coming soon).

Once your API is up and ready to go, you need a frontend to hit it. Follow the [Firebase Hosting](./FIREBASE_HOSTING.md) guide to deploy you Angular Todos application.

Enjoy!

## Project Configuration

- TypeScript `strict` mode. This project has be configured to use `strict` mode (along with Angular full template checking). This is not for everyone. This can be configured in `tsconfig.base.json`. (`strictPropertyInitialization` has been set to `false` as compilation errors will be thrown for property inputs in Angular components, e.g `@Input() someProperty: string`,)

- [TypeScript Project References](TODO_link) - The repo makes heavy use of project references for all server and shared libs as the server does not use `webpack` to bundle the server side code. For and example of configuring project references, see `apps/server/api/tsconfig.json` for referencing libs and `libs/server/auth/tsconfig.json` & `libs/server/auth/tsconfig.lib.json` for options for setting up a referenced project and setting its `buildInfoFile` (schematics to come!).

- Server `package.json` - Although this is a Monorepo with a single version policy for packages managed by the root level `package.json`, within the API application directory there is also a local `package.json`. The `server.Dockerfile` build process will use the local `package.json` to install all its **Production** dependencies so that all packages not related to the server are not installed. If you add additional packages (via `npm install <package>` they will have to be added manually to local package. The version numbering of the packages will be validated and kept in sync automatically (on each git commit) by a script located in `tools/scripts/src/validate-packages.ts` and hence maintain the single version policy.
