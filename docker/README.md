# Test and Build with Docker

## Building API Server

Note: You do not need to build your API server first

1. `docker build -t <image-name> -f docker/api.Dockerfile --build-arg PROJECT_DIRECTORY=apps/<project-directory> .`

## Test Production Angular Application

1. `docker build -t <image-name> -f docker/web.Dockerfile --build-arg DISTRIBUTION_DIRECTORY=dist/apps/<dist-folder> .`
2. `docker create --name <container-name> -p 8080:80 <image-name>`
3. `docker start <container-name>`
4. Run e2e Tests

## Test with Docker Compose

\$ docker-compose up -d

## Clean Up

1. `docker stop <container-name>`
2. `docker rm <container-name>`
3. `docker rmi <image-name>`
