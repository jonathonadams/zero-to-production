# Deploy your API on AWS Lambda functions

## Before you Start

Ensure you have all the [prerequisites] setup and ready prior to starting this guide.

## Run you Functions locally

Almost all of the heavy lifting for deploying and configuring your [AWS Lambda] functions is taken care for by the [Serverless] framework.

The only configuration that is required to be changed before deploying is the `serverless.yml` file inside `apps/server/lambda`. Change the `service: zero-to-production` field on the first line to whatever you would like your service to be named.

For local testing run the following command to build and serve locally with [serverless-offline].

```bash
ng serve server-lambda
```

## Deploy to AWS

When you are ready to deploy, build and deploy your cloud functions.

```bash
ng run server-lambda:build-and-deploy
```

And thats it! This will build and bundle you your application inside the `dist/` directory of the project and then [serverless] will package and deploy your API AWS.

Your API url will be output in the console once successfully

### Add environment variables

For your API to function environment variables must be set. The environment variables can be set one of two ways, either by creating a `.env.production` file in the project directory (`apps/server/lambda/.env.production`) or on the AWS console. If you create an `.env` file serverless will auto configure the variables for you.

To add them on AWS console navigate to to **Lambda > Functions** and select the service from the list.

On the configuration page scroll down to the **Environment Variables** and add the desired variables. For multiline variables, e.g. private/public keys, put all values on one line separated by line break characters. e.g.

```bash
# this
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0B...

# becomes
-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0B...
```

The environment variables required for the Lambda API are

- ACCESS_TOKEN_PRIVATE_KEY
- ACCESS_TOKEN_PUBLIC_KEY
- DB_CONNECTION_STRING
- ISSUER
- AUDIENCE

## Configure Your Custom Domain

Assuming the subdomain of `fns.zero-to-production.dev`

1. Get a a certificate ready with [AWS Certificate Manager].
2. Set up a custom domain name with [API Gateway]. Note, select **REST** and **Regional** for configuration options. Once created, add a **Base Path Mapping** of the root path, `/`, and direct it to lambda function. Copy the **Target Domain Name** (needed to set up the DNS records).
3. Configure a **CNAME** record in your DNS provider for the desired subdomain (e.g. `fns` for this demo) and use the **Target Domain Name** created in 2. to as the value for the **CNAME**

Once DNS propagates, you should be able to access your API and the desired subdomain, e.g. `fns.zero-to-production.dev`

## VPC Network Peering (if using Mongo Atlas)

In a real production server you would setup VPC Network Peering between your Mongo Atlas Project and your AWS Lambda function and only whitelist the Google Cloud CIDR range, however this feature is not available for the free tier cluster.

See the [AWS Lambda Best Practices] & [Mongo VPC Peering] docs on how to set up VPC Network Peering

## Running your API on AWS Lambda

Cold starts are a killer. If you function are not hot then there can be significant start up time before the request can be processed. This is compounded when accessing remote resources (e.g. our Mongo Atlas instance). There are numerous resources out there to help tackle this but a couple of things to note.

Our Lambda API uses a single handler for everything. When traffic is low this can be a relatively simple way to try and keep the container alive as every request goes to the one function. You can separate the application concerns later as traffic increases, e.g. Auth, GraphQL etc.

A quick google will show there are numerous solutions & plugins to help keep functions alive. That is an exercise that is left to you.

## Additional Notes

If you look at the source code for our Lambda API (`apps/server/lambda`) you will notice the way that the [Mongoose] schemas are defined and referenced differs slightly that the docs for a regular node application.

Defining the schema directly on the mongoose default import will cause errors if the schema model will try to 'recompile' each place it is imported throughout the application. Rather than define schemas on the mongoose import, connect to the db and then define them on the connection once connected. The connection object is used to grab a reference to a given model.

```typescript
// regular node server
import mongoose from 'mongoose';

// Doing this will cause errors in a serverless environment
const schema = new mongoose.Schema({ name: 'string' });
const User = mongoose.model('User', schema);

// Lambda functions
// Create a single connection
const connection = await mongoose.createConnection(uri);

const schema = new mongoose.Schema({ name: 'string' });
// defined the model on the connection
connection.model('User', schema);

// Get a reference to the model from the connection
const User = connection.model('User');
```

See the documentation on using [Mongoose with AWS Lambda] for further details.

[prerequisites]: https://zero-to-prouction.dev/guides/getting-started
[aws lambda]: https://aws.amazon.com/lambda
[serverless]: https://serverless.com
[serverless-offline]: https://github.com/dherault/serverless-offline
[aws certificate manager]: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains-prerequisites.html/
[api gateway]: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-regional-api-custom-domain-create.html#create-regional-domain-using-console
[aws lambda best practices]: https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
[mongo vpc peering]: https://docs.atlas.mongodb.com/security-vpc-peering/
[serverless-offline]: https://github.com/dherault/serverless-offline
[mongoose]: https://mongoosejs.com
[mongoose with aws lambda]: https://mongoosejs.com/docs/lambda.html
