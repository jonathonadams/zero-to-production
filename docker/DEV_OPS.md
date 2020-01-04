docker build -t api-test -f docker/api.Dockerfile --build-arg PROJECT_DIRECTORY=apps/servers/api .

npm run build:server -- --projectDirectory=apps/servers/api --containerName=test-name

docker build -t todos -f docker/web.Dockerfile --build-arg DISTRIBUTION_DIRECTORY=dist/apps/web/todos .
