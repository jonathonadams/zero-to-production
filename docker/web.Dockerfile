FROM nginx:alpine

ARG DISTRIBUTION_DIRECTORY
RUN test -n "$DISTRIBUTION_DIRECTORY" || (echo "DISTRIBUTION_DIRECTORY  not set" && false)

COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY $DISTRIBUTION_DIRECTORY/ .