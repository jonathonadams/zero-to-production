# Docker cheat-sheet

Build a docker image from a Dockerfile

```
docker build -t <YOUR-IMAGE-NAME> .
```

`-t` image tag name, `.` specifies from the current director

e.g.

```
docker build -t api-server-image .
```

Create a docker container from an image.

```
docker create --name <YOUR-CONTAINER-NAME> -p 3000:3000 <YOUR-IMAGE-NAME>;
```

`--name` container name, `-p` map container to host ports, `<YOUR-IMAGE-NAME>` specifies the image to create the container from.

Optional you can set environment variables, individually or from a file.

```
docker create --name <YOUR-CONTAINER-NAME> -p 3000:3000 --env-file .env <YOUR-IMAGE-NAME>;
```

`--env-file` environment file name.

e.g.

```
docker create --name api-server-container --env-file .env -p 3000:3000 api-server-image;
```

`docker start` Start a docker container

```
docker start <YOUR-CONTAINER-NAME>
```

`docker network` Create a docker network.

```
docker network <NETWORK-NAME>
```

`docker network rm` remove a docker network.

```
docker network rm <NETWORK-NAME>
```

e.g.

```
docker network create proxy
docker network create internal
docker network rm proxy
```

## Local Mongo DB

NOTE: A word of warning, if your delete your container instance all data will be lost. Containers are ephemeral. To help mitigate this during development use `docker create` then `docker start / stop`. The container will not be destroyed until you remove it.

Make sure to map the port so that it is available outside of the docker environment.

```Bash
docker create \
  --name mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongo_user \
  -e MONGO_INITDB_ROOT_PASSWORD=mongo_password \
mongo
```

Note: If the mongo image has not previously been downloaded, the `docker create` command will pull the image for you. Alternatively you can run `docker pull mongo` to manually download the image before your run `docker create`

This will create a container called `local-mongo` from the `mongo` image.

Start the container

```
docker start local-mongo
```

Once the container is running, you can exec into the container terminal (and mongo) by running the `docker exec` and run all your command line commands.

```bash
docker exec -ti local-mongo bash
```

To leave the container, just type `exit`

Stop the container

```
docker stop local-mongo
```

Read more about Mongo and Docker and how to configure it on [docker hub - mongo]

[docker hub - mongo]: https://hub.docker.com/_/mongo
