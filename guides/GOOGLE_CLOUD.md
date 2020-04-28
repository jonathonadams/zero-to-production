# Deploy your API Server in Google Cloud Kubernetes

**WARNING**: This guide is in no way a comprehensive or 'production grade' guide to deploying your application in Kubernetes, rather a starting point for you to test and get your feet wet with deploying your containers to the cloud. This examples deploys the single node API with [traefik] as a reveres proxy, an architect that may not warrant the complexity. That being said, the kubernetes resource configurations should give you an idea of how to add additional services and deployments to you cluster e.g. separate the Authentication module to it's own server.

## Before you Start

Ensure you have completed all the [prerequisites].

All files related to deploying to Google Cloud Kubernetes are located in the `dev-ops/` directory.

## Google Cloud Build Trigger

A `Dockerfile` to build our API project from the source files is provided at `docker/server.Dockerfile`. Please see the [Docker README] for further details.

Rather than build and push our container to the cloud registry, Google Cloud offers a build trigger function to build your production images for you.

The image that you build and is subsequently pushed to the Google Cloud Registry is the image you will use in you Kubernestes configurations files. The image name should follow the convention `<registry>/<cloud-project-name>/<image-name>`.

1. On Google Cloud, navigate to **Tools > Cloud Build**.
2. Follow the steps to connect you **`Git`** repo.
3. Once your repo is authenticated, create a _Push Trigger_ by following the wizard. It is entirely up to you what rules you configure (branch, tag etc.) to trigger a new build, but be mindful this is a Monorepo and not all commits should re-trigger the server build.

- When selecting the `Build Configuration` select the `Cloud Build Configuration File` option and point it at `/dev-ops/cloudbuild.yaml`
- The build file is set up to use _substitutions_ for the image name and the source directory of the project. The **\_IMAGE_NAME** and **\_PROJECT_DIRECTORY** variables must be set and the project directory is relative to the `apps/` directory.

  For this example site:  
  **\_IMAGE_NAME**: `gcr.io/zero-to-production/z2p-api`
  **\_PROJECT_DIRECTORY**: `server/api`

4. Manually trigger the build to test that the build runs and your container image is visible in the **Container Registry** once complete.

## Google Cloud - Kubernetes Cluster

Follow the next steps to deploy you production container.

1. Reserve a Static IP address to allow the load balancer to auto create global forwarding rules. **VPC Network > External IP Address > Reserve Static IP**.
2. Create a new Kubernetes Cluster, **Kuberetes Engine > Clusters > Create Cluster** and follow the guides as necessary. For testing select the preset 'My first cluster'. Once up and running connect to your cluster from your terminal.
3. Once connected, the first step is to apply all configuration and secrets to the cluster that any of the containers may require. For this setup all required setup files are located in the `dev-ops/config/` directory.

   - `config.yaml`: Contains non sensitive information and is `ConfigMap` resource. **No changes required**
   - `secrets.yaml`: A `Secret` resource that contains all sensitive information. All values here must be base64 encoded strings. **DO NOT COMMIT THIS INTO SOURCE CONTROL**. Rename `example.secrets.yaml` to `secrets.yaml`. **Changes required**
     - Replace the PLACEHOLDER entries with your respective encoded strings.
   - The `server-middleware.yaml` is a `BackendConfig` resource to change the default timeout for all connections. This is required for WebSocket connections, with a possible maximum time of 24 hours. **No changes required**
   - `gcl-managed-certificate.yaml` configures a [Google Managed Certificate] for SSL/TLS for our domain. **Changes required**
     - Name of the **managed certificate resource**
     - The associated certificate **domain name**
   - `traefik-cluster-role.yaml`: Role-based access control for [Traefik], the reverse proxy sitting between the Google Cloud L7 global load balancer and your application containers. **No changes required**
   - `traefik-config.yaml` is the `.toml` configuration for Traefik. **No changes required**

   Apply all configuration specs by running:

   ```bash
   kubectl apply -f dev-ops/kubernetes/config/
   ```

4. Configure all the Deployment & Ingress Configurations

   - `traefik-deployment.yaml` : **No changes required**
   - `google-load-balancer-ingress.yaml`: **Changes required**
     - Name of the **static ip**
     - Name of **managed certificate resource**
   - `api-deployment.yaml`: **Changes required**
     - Name of **container image**
     - Change all deployment and service names to your choosing (i.e. `z2p-api-service` to `your-chosen-service-name`)
     - Change the name of the service **port**
   - `fannout-ingress.yaml`: **Changes required**
     - Change the **host** to the domain at which you cluster will be located
     - service **name/port** to your own respective values.

5. Apply all deployments and ingress resources to the cluster

   ```bash
   kubectl apply -f dev-ops/kubernetes/
   ```

6. Wait for all your containers to be provisioned. You can view your Deployments and Ingress resources under **Kubernetes Engine** -> **Workloads/Services & Ingress**

### Notes

In the Global Load Balancer config, `HTTP` traffic has been disabled so you can only access your cluster via `HTTPS`, hence you will have to also configure your DNS provider (see below). HTTP to HTTPS redirect is coming soong

## Configure Your DNS Provider

To access your cluster via your domain name, e.g. `api.zero-to-production.dev` you will have to configure your DNS records with your domain name provider. Assuming you are hosting your API at the subdomain `api.your-domain.tld`, then create an **A** record (or **AAAA** if using **IPv6**) that directs your subdomain to the static IP address reserved at **1**. This will take time to propagate (up to 24 hours). Once updated test your cluster is running correctly by visiting the `/healthz` url for your domain (this is the readiness probe route). You should receive status **200** OK response back.

## Reconfigure Client Application

If you have completed the previous guides you would have deployed the Angular Todo application on Firebase Functions. The application would currently have the API URL configured the AWS Lambda functions. Updated this to point to the Kubernetes API and redeploy you application.

## VPC Network Peering (if using Mongo Atlas)

In a real production server you would setup VPC Network Peering between your Mongo Atlas Project and your Google Cloud Project and only whitelist the Google Cloud CIDR range. However this feature is not available for the free tier cluster.

See the [Mongo VPC Peering] docs on how to set up VPC Network Peering

[prerequisites]: https://zero-to-prouction.dev/guides/getting-started
[docker readme]: https://github.com/jonathonadams/zero-to-production/docker/README.md
[traefik]: https://docs.traefik.io/
[google managed certificate]: https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs
[mongo vpc peering]: https://docs.atlas.mongodb.com/security-vpc-peering
