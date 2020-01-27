## Pre-reqs

Make sure to have [Google Cloud SDK](https://cloud.google.com/sdk) and [Kubernetes CLI](https://kubernetes.io/docs/reference/kubectl/) installed.

You will need an instance of a Mongo DB for the API to connect to (via a connection string). This is entirely up to you how/where you would like to host your DB but Mongo Atlas has a free tear that you can test with. Follow [these steps](./MONGO_ATLAS.md) to set up a DB.

An RS256 Private Key is required for singing the short lived JWT access tokens. Depending on the Authentication Guard setup (see the [API Authentication Library](../libs/backend/auth/README.md)) you may or may not need the Public Key for Verifying the JWT. As the API is currently set up, the public key is auto generated from the private key at startup and served as a [JSOn Web Key Set (JWKS)](https://tools.ietf.org/html/rfc7517) at the url `/.well-know/jwks.json`. See [here](https://auth0.com/docs/tokens/concepts/jwks) for further explanation and rational behind a JWKS.

There is a helper script in `tools/scripts/bin/generate-rsa.js` to generate an RSA256 Private Key (pkcs8).

## Google Cloud - Build Trigger

As we are deploying our cluster on Google Cloud, we can make the most of the tools available and setup a cloud trigger to auto build our `Docker` image for us.

A `Dockerfile` to build our API project from source files is provided at `docker/api.Dockerfile`. Please see the [README](../docker/README.md) for further details.

NOTE: The image name that you build and push to the Google Cloud Registry here is the image you will uses in you Kubernestes cluster. The image name should be \<registry>/\<cloud-project-name>/\<image-name>

1. On Google Cloud, go to Cloud Build. **Tools** -> **Cloud Build**.
2. Follow the steps to connect you `Git` repo.
3. Create a **Push Trigger** by following the instructions. **Note**: It is entirely up to you what rules you configure (branch, tag etc.), but be mindful this is a Monorepo and not all commits should re-trigger the build.

   - When selecting the `Build Configuration`, select the `Cloud Build Configuration File` and point it at `/dev-ops/cloudbuild.yaml`
   - The build file is set up to use substitutions for the image name and the source directory of the project. For this example, the **\_IMAGE_NAME** and **\_PROJECT_DIRECTORY** variables must be set.

     For this example site: **\_IMAGE_NAME**: `gcr.io/zero-to-production/z2p-api` and
     **\_PROJECT_DIRECTORY**: `libs/backend/api`

4. Manually trigger the build to test the build runs and you container image is available in the container registry

## Google Cloud - Kubernetes Cluster

1. Reserve a Static IP address to allow the load balancer to auto create forwarding rules. VPC Network -> External IP Address.
2. Create a new Kubernetes Cluster. Once up and running connect to your cluster. Kuberetes Engine -> Clusters -> Create Cluster (and follow the guides as necessary).
3. Once connected, first thing is to apply any configuration or secrets to the cluster that the containers may require. For this setup all required setup files are located in the `config/` directory.
   - The `config.yaml` contains non sensitive information and is `ConfigMap` resource.
   - `secrets.yaml` is a `Secret` resource. All values here must be base64 encoded string. **DO NOT COMMIT THIS INTO SOURCE CONTROL**. Make a copy of `example.secrets.yaml` and rename to `secrets.yaml`. Replace the PLACEHOLDER entries with your respective values.
   - `traefik-external-config.yaml` is the `.toml` configuration for [Traefik](https://docs.traefik.io/), the reverse proxy sitting between the Google Cloud L7 global load balancer and your application containers.
