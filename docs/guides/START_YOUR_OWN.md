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
10. remove the `scope:examples` rule from `nx-enforce-module-boundaries` in `tslint.json`

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

11. uninstall unused /unwanted npm packages

    ```bash
    npm uninstall <package>
    ```

    - `prismjs`
    - `@angular/service-worker`
    - `@angular/platform-server`

## Configure the Application (Important)

In some parts of the apps / libs they have been configured specifically for the [zero-to-production.dev](https://zero-to-production.dev) such as configuring the `User` model to not require unique emails. These places have been marked and commented on what to do.

To find and configure them, in your IDE do a search for `UQT_UPDATE` and configure as per the comments.

## Deploy your project

Now that you have cloned, re-branded and cleaned up your Monorepo, it's time to deploy.

First, deploy your API server. Follow the [Google Cloud](./GOOGLE_CLOUD.md) guide to deploy your API server on GC Kubernetes Engine. (AWS Lamda coming soon).

Once your API is up and ready to go, you need a frontend to hit it. Follow the [Firebase Hosting](./FIREBASE_HOSTING.md) guide to deploy you Angular Todos application.

Enjoy!

# Things to consider

TODO -> Document project configuration

- Server setup
- env variables
- why nested `package.json`
