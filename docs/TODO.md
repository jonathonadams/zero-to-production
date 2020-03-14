- Nrwl Repo - https://github.com/nrwl/nx/issues/259 & https://github.com/nrwl/nx/issues/1515

### Docs

- [ ] Specify minium Node version,
  - serverless deploy requires 12.10 for recursive rmdir
- [ ] Thoroughly document the API Auth module

### App

- [ ] Move Todo detail to own component

### Dynamic Form

- [x] allow form to use form array fields or array groups
- [ ] Documentation
- [ ] Write tests for dynamic form

### Form Builder

- [ ] Document
- [ ] Tests

### Tests

- [ ] Document the current completed tests
- [ ] Complete Unit tests
- [ ] Complete e2e tests
- [ ] tests for Lambda API

### Accessability

- [ ] Audit for a11y

## Dev-Ops

- [ ] Configure the build script to tag Docker images
- [ ] Configure the Load Balance to uses HTTP2 from Load balancer through to Reverse Proxy
  - Can the certificates be accessed from the ManagedCertificate Resource?
- [ ] Create a lambda / cron docker container to create database indexes
- [ ] Change authentication for Lambda functions to use an authorizer? This means the servers will have to be separated
