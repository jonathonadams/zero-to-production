# Getting Started

If you want to use this monorepo as the starting point for your next project or to work through the guides then follow the below instructions tidy up and remove all unused apps/libs.

## Start Your Own

Clone and install all dependencies.

```bash
git clone https://github.com/unquenchablethyrst/zero-to-production.git workspace

cd workspace

npm i
```

### Housekeeping

- change `package.json` fields as required, e.g. `name`, `license`, `version`.
- change the application prefix by doing a `search and replace` for **uqt** and replace with your desired app prefix.
- delete `CODE_OF_CONDUCT.md` and `LICENSE.md` files.
- create you own color theme in `libs/theme/theme.scss`
- delete the `firebase.json` file in the root directory (you will create your own when you deploy your Angular application)

### Remove "Examples" Angular Project (Optional)

The "Examples" angular application project is all projects and libs corresponding to the demo website at [zero-to-production.dev]

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

- uninstall unused / unwanted npm packages. Note that if you complete the guides some of these will be reinstalled.

  ```bash
  npm uninstall <package>
  ```

  - `@angular/service-worker`
  - `@angular/platform-server`
  - `@nguniversal/express-engine`
  - `prismjs`
  - `marked`
  - `express`
  - `@types/express`
  - `firebase-admin`
  - `firebase-functions`

### Project Structure

The repo follows the [Nrwl] monorepo guidelines where all applications are in the `apps/` directory and libraries are in the `libs/` directory. Assuming you have followed the above and deleted the `examples` applications you should be left with the following:

- `apps/todos/todos-web` - The Angular web Todo application.
- `apps/todos/todos-web-e2e` - The Angular web end-to-end application.
- `apps/server/api` - The Node API build to run in Docker (for Kubernetes)
- `apps/server/lambda` - The Node API build to run serverless on AWS Lambda.

See the [NX] site for further details on project structure.

### Configure the Application (Important)

In some parts of the apps / libs they have been configured specifically for the [zero-to-production.dev] such as configuring the MongoDB `User` model to not require unique emails. These places have been marked and commented on what to do.

To find and configure them to your needs search for `UQT_UPDATE` and configure as per the comments.

## Local Development

Local development is relatively simple.

To serve the Angular Todo application run `ng serve` (or `ng serve todos-web`)

To run the API, first follow these steps:

- Create a MongoDB server. The [docker cheat-sheet] list how to create one with docker.
- create a `.env` file for environment variables in the project root of both `apps/server/api` & `apps/server/lambda`. An examples `.env` file is located in `apps/server`, copy and rename `.env.example` to `.env` located and set your desired environment variables.

  **WARNING** - Do NOT use the `RSA256` private / public keys that are in `.env.example` for production as they are public and not secure, they are just demonstrating how to set them in the `.env` file.

`ng serve server-api` will run the docker based API and `ng serve server-lambda` will run the cloud functions API. Both server will serve on port 3000

## Project Configuration

- TypeScript `strict` mode: This project has be configured to use `strict` mode (along with Angular full template checking). This is not for everyone. This can be configured in `tsconfig.base.json`. (`strictPropertyInitialization` has been set to `false` as compilation errors will be thrown for property inputs in Angular components, e.g `@Input() someProperty: string`,)

- [TypeScript Project References] - The repo makes use of project references for all server and shared libs as the Kubernetes API does not use `webpack` to bundle the server side code. For an example of configuring project references, see `apps/server/api/tsconfig.json` for referencing libs and `libs/server/auth/tsconfig.json` & `libs/server/auth/tsconfig.lib.json` for options for setting up a referenced project and setting its `buildInfoFile` (schematics to come!).

- Server `package.json` - Although this is a Monorepo with a single version policy for packages managed by the root level `package.json`, within the API application directory there is also a local `package.json`. The `server.Dockerfile` build process will use the local `package.json` to install all its **Development & Production** dependencies so that packages not related to the server are not installed in the production container. If you add additional packages (via `npm install <package>`) for the API they will have to be added manually to local package. The version numbering of the packages will be validated and kept in sync automatically (on each git commit) by a script located in `tools/scripts/src/validate-packages.ts` and hence maintain the single version policy.

## Guides & Deployments

The following guides are a series of instructions to take your newly cloned project from local development to a deployed working frontend & API.

It is advised to follow the guides in the following order as they are designed to designed to get you up and running and deployed and then progressively increase in complexity as your application grows and warrants it.

- Deploy your serverless API with [AWS Lambda]
- Deploy you Angular app with [Firebase Hosting]
- Add server side rendering to you Angular app with [Angular Universal & Firebase Functions]
- Migrate you API from serverless functions to a Kubernetes Cluster with [Google Cloud Kubernetes]

### Prerequisites

To complete the guides you will need to complete the following

- **Create Cloud Providers Accounts** - If you do not have accounts already you will need to create accounts with **[Firebase]**, **[AWS]** & **[Google Cloud]**. Note: the use of multiple cloud providers has been used for a reason, mainly for learning purposes but also to help get familiar with multiple platforms.

- **Install CLI's & global npm packages**

  - Install the [Google Cloud SDK] and [Kubernetes Ctl] authenticate to your Google Cloud Account (**Kubernetes guide only**).
  - Install the [AWS CLI] and login and create a profile for your AWS account (**AWS Lambda guide only**).
  - Install the following global npm packages
    ```bash
    npm install -g @angular/cli firebase-tools serverless
    ```

- **Domain Name**: To work through the guides you will need a domain name. For this example the domain name will be `zero-to-production.dev`. For the API deployment the guides will assume AWS Lambda functions will be hosted at the subdomain `fns.zero-to-production.dev` and the Google Cloud K8s will be hosted at the subdomain `api.zero-to-production.dev`

* **RS256 Private & Public Key**: A Private & Public key is required for singing your JWT access tokens. Depending on the Authentication Guard setup (see the [API Authentication Library]) you may or may not need the Public Key for Verifying the JWT. As the API is currently set up, the public key is auto generated from the private key at startup and served as a [JSON Web Key Set (JWKS)] at the url `/.well-know/jwks.json`. See [Auth 0] for further explanation and rational behind a JWKS.  
  There is a helper script in `tools/scripts/bin/generate-rsa.js` to generate an RSA256 Private Key (pkcs8).

* **Mongo Database**: You will need a Mongo Database for your API to connect to. It is entirely up to you how & where you host your DB but [Mongo Atlas] has a free tear that you can use to test with. A couple of notes on setting up Mongo Atlas.

  - For this testing setup, allow connections from all IP Addresses. See the notes later about setting up **VPC Network Peering** in production.
  - Once your cluster is up an running, click **collections** and create a database (note the name) and the first collection i.e. the `users` collection.
  - Click **connect** &rarr; **connect your application** and get your connection string, by default the connection string will point to the `test` database. Replace the test database with the desired database, i.e. `mongodb+srv://.../my-database-name?retryWrites=true&w=majority`

[zero-to-production.dev]: https://zero-to-production.dev
[docker cheat-sheet]: https://github.com/unquenchablethyrst/zero-to-production/docker/DOCKER_CHEAT_SHEET.md
[aws lambda]: https://zero-to-production/guides/guides/aws-lambda
[firebase hosting]: https://zero-to-production/guides/guides/firebase-hosting
[angular universal & firebase functions]: https://zero-to-production/guides/ssr-firebase-functions
[google cloud kubernetes]: https://zero-to-production/guides/google-cloud-k8s
[typescript project references]: https://www.typescriptlang.org/docs/handbook/project-references.html
[google cloud sdk]: https://cloud.google.com/sdk
[kubernetes ctl]: https://kubernetes.io/docs/reference/kubectl
[aws cli]: https://docs.aws.amazon.com/cli/latest/userguide/indstall-cliv2.html
[mongo atlas]: https://www.mongodb.com/cloud/atlas
[api authentication library]: https://github.com/unquenchablethyrst/zero-to-production/libs/server/auth/README.md
[json web key set (jwks)]: https://tools.ietf.org/html/rfc7517
[auth 0]: https://auth0.com/docs/tokens/concepts/jwks
[nrwl]: https://nrwl.io
[nx]: https://nx.dev
[firebase]: https://firebase.google.com
[google cloud]: https://cloud.google.com
[aws]: https://aws.amazon.com/
