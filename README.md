# PRE ALPHA - WORK IN PROGRESS

## Checklist

### API

- [ ] Reconfigure Dockerfile to account for libs.
      https://medium.com/@pro_ibenjell/how-to-create-a-full-stack-chat-application-using-nx-workspace-and-run-it-in-docker-65afcfe879d0
- [ ] Add all Kubernetes deployment specs.

### Path Re-writer

- [x] Make the path rewriter rewrite all library paths, not just main tsconfig paths.
- [x] Add an example project structure
- [ ] User read/write streams not promises.
- [ ] Look to plugin into ts compiler?
- [ ] Tests
- [ ] Move to own package

### Builders

- [ ] remove the aliases from the API server.
- [ ] Tests
- [ ] Move to own packages

### Web App

#### App

- [x] Finish user registration. NOTE -> For the demo, don't require unique emails

#### Dynamic Form

- [x] Dynamic Form to accept validators
- [x] Dynamic Form global errors (with animations)
- [x] Make the form errors pipe accept form level errors.
- [ ] Collect form errors from side effects submit
- [ ] Restyle errors animations
- [x] Submit button not using content projection does not have auto focus
- [ ] Write tests for dynamic form

#### Accessability

- [ ] Audit for a11y

### Deployment

- [ ] Create a demo site & cloud functions

#### Tests

- [ ] Complete Unit tests
- [ ] Complete e2e tests

## Post Alpha Checklist

### App

- [ ] Add preloader spinner
- [ ] Feature Flag Service
- [ ] Add a settings section
  - Re style user drop down to only have username, avatar and link to settings
- [ ] Add an example sections outline functionality
  - Content Projection with layouts modules
  - Users to create components and dynamically add routing to them
  - Dynamic Animation Timing

### Mobile App

- [ ] Add Nativescript support

## Issues to track / tidy up before release.

### Jest & ES6 Modules

Currently Jest does not support es6 Modules, so modules can not be used in testing
lodash-es is tree shakeable, however fails tests at the moment so install individual common lodash libraries for now then remove them when
the below issue is resolved.
https://github.com/facebook/jest/issues/4842

### RXJS & TypeScript Filter Issues

TS does not correctly infer the types when using filters, current typescript issues

https://github.com/Microsoft/TypeScript/issues/10734
https://github.com/Microsoft/TypeScript/issues/16069

### TypeScript Path Remapping

TS does not rewrite path aliases, once ES modules are no longer experimental they will as per below github link
https://github.com/Microsoft/TypeScript/issues/10866

https://github.com/Microsoft/TypeScript/issues/15479

https://www.npmjs.com/package/tspath

https://github.com/cevek/ttypescript

https://github.com/LeDDGroup/typescript-transform-paths

https://github.com/dividab/tsconfig-paths

### Angular IVY and Strict Mode

Generic template checking.
https://github.com/angular/angular/issues/30235

### TS Path References are not inherited

Once merged, remove references from the tsconfig.lib.json's

https://github.com/Microsoft/TypeScript/issues/27098

### Nativescript does not currently support the monorepo design

https://github.com/NativeScript/NativeScript/issues/7537

## TestCafe E2E Builder

TODO -> Create an TestCafe Builder

## ngw
