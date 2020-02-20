# Start You Own Monorepo

If you want to use this repo as the foundation for your own Monorepo then follow these steps to re-brand and tidy up the repo.

## Housekeeping

- change `package.json` fields as required, e.g. `name`, `license`, `version`.
- change the application prefix by doing a `search and replace` for **uqt** and replace with your desired app prefix.
- delete `CODE_OF_CONDUCT.md` and `LICENSE.md` files.
- create you own color theme in `/libs/theme/theme.scss`
- delete the `firebase.json` file in the root directory (you will create your own when you deploy your Angular application)

## Remove "Examples" Project (Optional)

The "Examples" project is all projects and libs corresponding to the demo website at [zero-to-production.dev]

- delete the "Examples" application in `apps/examples/*`
- delete all libs corresponding to the "Examples" application at `libs/examples/*`
- delete all projects and libraries in the `angular.json` that begin with `examples-`
- delete the same projects from the `nx.json` file.
- delete all TypeScript path `@aliases` referencing `examples` apps or libs in `tsconfig.json`
- remove the `scope:examples` rule from `nx-enforce-module-boundaries` in `tslint.json`

  ```json
  // tslint.json
  "nx-enforce-module-boundaries": [
  ...
  // delete these lines
    {
      "sourceTag": "scope:examples",
      "onlyDependOnLibsWithTags": ["scope:examples", "scope:shared"]
    }
  ```

- uninstall unused / unwanted npm packages. Note that some of these will be reinstalled if you follow all the deployment guides.

  ```bash
  npm uninstall <package>
  ```

  - `prismjs`
  - `marked`
  - `@angular/service-worker`
  - `@angular/platform-server`
  - `@nguniversal/express-engine`
  - `express`
  - `@types/express`
  - `firebase-admin`
  - `firebase-functions`

## Configure the Application (Important)

In some parts of the apps / libs they have been configured specifically for the [zero-to-production.dev] such as configuring the `User` model to not require unique emails. These places have been marked and commented on what to do.

To find and configure them, in your IDE do a search for `UQT_UPDATE` and configure as per the comments.

## Local Development

Local development is relatively simple.

To serve the Angular Todo application run `ng serve`.

To get the API up and running follow the below.

- crete a local MongoDB server. The [docker cheat-sheet] shows how to create one with docker.
- create a `.env` file for environment variables. Copy and rename `.sample.env` to `.env` located in `apps/server/api` and set your desired environment variables.
- `ng serve server-api` will run the server

**WARNING** - Do NOT use the `RSA256` private keys that are in `.sample.env` as they are public and not secure, they are just demonstrating how to set them in the `.env` file.

## Deploy your project

Once cloned, re-branded and cleaned up, it's time to deploy.

Deploy your API server on Kubernetes. Follow the [Google Cloud Kubernetes] guide to deploy your API server on GC Kubernetes Engine. (AWS Lamda coming soon).

Once your API is up and ready to go, deploy your frontend to hit it. Follow the [Firebase Hosting] guide to deploy you Angular Todos application.

When you application warrants it, add server side rendering and deploy on Firebase Functions following the [Server Side Rendering with Firebase Functions] guide.

## Project Configuration

- TypeScript `strict` mode. This project has be configured to use `strict` mode (along with Angular full template checking). This is not for everyone. This can be configured in `tsconfig.base.json`. (`strictPropertyInitialization` has been set to `false` as compilation errors will be thrown for property inputs in Angular components, e.g `@Input() someProperty: string`,)

- [TypeScript Project References] - The repo makes heavy use of project references for all server and shared libs as the server does not use `webpack` to bundle the server side code. For and example of configuring project references, see `apps/server/api/tsconfig.json` for referencing libs and `libs/server/auth/tsconfig.json` & `libs/server/auth/tsconfig.lib.json` for options for setting up a referenced project and setting its `buildInfoFile` (schematics to come!).

- Server `package.json` - Although this is a Monorepo with a single version policy for packages managed by the root level `package.json`, within the API application directory there is also a local `package.json`. The `server.Dockerfile` build process will use the local `package.json` to install all its **Production** dependencies so that all packages not related to the server are not installed. If you add additional packages (via `npm install <package>` they will have to be added manually to local package. The version numbering of the packages will be validated and kept in sync automatically (on each git commit) by a script located in `tools/scripts/src/validate-packages.ts` and hence maintain the single version policy.

[zero-to-production.dev]: https://zero-to-production.dev
[docker cheat-sheet]: https://github.com/unquenchablethyrst/zero-to-production/docker/DOCKER_CHEAT_SHEET.md
[google cloud kubernetes]: https://zero-to-production/guides/google-cloud-k8s
[firebase hosting]: https://zero-to-production/guides/guides/firebase-hosting
[server side rendering with firebase functions]: https://zero-to-production/guides/ssr-firebase-functions
[typescript project references]: https://www.typescriptlang.org/docs/handbook/project-references.html
