# Test and Build with Docker

## Building Server Projects

Note: You do not need to build your server first, the Dockerfile will compile the project from the source files.

The following command will build your server project. Replace the `<image-name` and `<project-directory>` to you desired inputs. Note the project directory is relative to the `apps/` directory so if you project is `apps/server/api` then the `PROJECT_DIRECTORY` is `server/api`. Then entry file points to `main.js` in the root directory.

1. `docker build -t <image-name> -f dev-ops/docker/server.Dockerfile --build-arg PROJECT_DIRECTORY=<project-directory> .`

## Test Production Angular Application

1. `docker build -t <image-name> -f dev-ops/docker/web.Dockerfile --build-arg DISTRIBUTION_DIRECTORY=dist/apps/<dist-folder> .`
2. `docker create --name <container-name> -p 8080:80 <image-name>`
3. `docker start <container-name>`
4. your application can be accessed at `http://localhost:8080`
5. test / run e2e Tests
6. clean up

## Clean Up

1. `docker stop <container-name>`
2. `docker rm <container-name>`
3. `docker rmi <image-name>`

## Test with Docker Compose

\$ docker-compose up -d
