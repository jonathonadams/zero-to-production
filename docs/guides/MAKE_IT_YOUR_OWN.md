TODO

1. git clone https://github.com/unquenchablethyrst/zero-to-production.git
2. Change package.json fields as required (name, license, version etc)
3. Change the `uqt` component prefix as desired.

   - your Using your IDE (or similar), search in all

4. Optional, remove unused npm packages (Prism.js, CdkScroll/Overlay)

## uqt

- Finish user registration. NOTE -> For the demo, don't require unique emails

- Sign up for a SendGrid account
  -- Document to make a pretty template

- Change the navigation section in the TODO app because of the relative path section

COLOR PALLET

## Angular Client

Delete firebase.json

## API

### AUTH MODULE

Delete the 'demo' auth folder found here TODO and delete the `demo.auth.ts` file here TODO

## Deploy your project

Now that you have cloned, re-branded and cleaned up your Monorepo, it's time to deploy.

First, deploy your API server. Follow the [Google Cloud](./GOOGLE_CLOUD.md) guide to deploy your API server on GC Kubernetes Engine. (AWS Lamda comming soon).

Once your API is up and ready to go, you need a frontend to hit it. Follow the [Firebase Hosting](./FIREBASE_HOSTING.md) guide to deploy you Angular Todo's application.

Enjoy!
