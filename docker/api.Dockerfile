# -----------------------------------------
# Multi build file
# One for building our app and one for production
# -----------------------------------------

# -----------------------------------------
# Build container
# -----------------------------------------
# The build container is from the full node image for dependency installation
FROM node:alpine AS builder-setup

# Create the tmp working directory
WORKDIR /tmp

# Set the node environment to development
ENV NODE_ENV development

# Copy all files required for the build container to run
# Do not copy the source files here, every change will require a new npm install
# NOTE: The .dockerignore needs to explicitly allow files to be 'visible' or this will fail

# COPY all top level files NOTE -> Do not copy the top level package.json, use the local one
COPY angular.json package.json package-lock.json tsconfig.json tsconfig.libs.json /tmp/

RUN cd /tmp 


# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.
# Also disable the MongoMemoryServer Post Install
ENV MONGOMS_DISABLE_POSTINSTALL=1

# RUN npm install --only=dev --unsafe-perm || \
#   ((if [ -f npm-debug.log ]; then \
#   cat npm-debug.log; \
#   fi) && false)

RUN npm install

FROM node:alpine AS production-setup

# Create the app working directory
WORKDIR /app/api

# Set the node environment to production
# This also means only prodcution npm's are installaed
ENV NODE_ENV production

# RUN mkdir /app/api/dist

# Copy the distribution folder from the builder file
# COPY --from=builder /tmp/dist /app/api/dist/

# Copy the distribution folder from the builder file
COPY package-lock.json /app/api/
COPY apps/servers/api/package.json  /app/api/

RUN cd /app/api

# # Copy accross all reqired files
# COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install --only=prod --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
  cat npm-debug.log; \
  fi) && false)


# Back to builder container
FROM builder-setup as builder

ENV NODE_ENV development

# COPS all src files
COPY apps/servers/api/ /tmp/apps/servers/api

# Make the API src directory, libs directory and distribution director 
RUN mkdir -p /tmp/dist



# COPS all libs 
COPY libs/ /tmp/libs

# TODO -> Remove once own packages
# COPY the tools accross that include the builders
COPY tools/  /tmp/tools

# TODO -> remove this
COPY testing/ /tmp/testing

RUN cd /tmp/

RUN npm run build:libs
RUN npm run build:tests


COPY apps/servers/api/package.json  /tmp

# Run the production build task (from app specifig package.json)
RUN npm run build

# -----------------------------------------
# Production container
# -----------------------------------------
# Production image from the alpine image
FROM production-setup as production

# Set the node environment to production
# This also means only prodcution npm's are installaed
ENV NODE_ENV production

RUN mkdir /app/api/dist
# Copy the distribution folder from the builder file
COPY --from=builder /tmp/dist dist/


RUN cd /app/api

# Expose port 3000
# This port must match the port for the K8's continer health probe
# It must be exposed else the probe will fail
EXPOSE 3000

# Run the start command
CMD node dist/api/main.js
