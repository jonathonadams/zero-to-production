FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./dist/apps/web/todos .