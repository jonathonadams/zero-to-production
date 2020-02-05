# ----------------------------------------------------------
# Multi build file - One for building our app and one for production
#
# Seperate containers so that the production container does not
# Contain all the development dependencies and source files, only
# output .js files and production dependencies
# ----------------------------------------------------------

# NOTE: The .dockerignore needs to explicitly allow files to be 'visible' or the build will fail

# ----------------------------------------------------------
# Docker cachs intermediate containers when building images
# and uses the cached containers if there has been no changes to 
# the build before that current step. Becuase of this, it is best
# to install all dependencies at the start so that they are cached and 
# any subsequent changes to source files, libs etc will no require deps to be
# reinstalled. Only changes to your config files will cause reinstalling
# of dependencies.
# ----------------------------------------------------------

# -----------------------------------------
# Build Container - Initail Dependency Install 
# -----------------------------------------
FROM node:alpine AS builder-setup

# Set the node environment
ENV NODE_ENV development

# Create the tmp working directory
WORKDIR /tmp

# Copy all files required for dependencies to be installed 
COPY package.json package-lock.json /tmp/

# Disable the MongoMemoryServer Post Install & Cypress Binary Install
ENV MONGOMS_DISABLE_POSTINSTALL=1
# ENV CYPRESS_INSTALL_BINARY=0

# TODO -> Onlyd dev dependencies? And only for building the API
# Install all deps
RUN npm install


# -----------------------------------------
# Production Container - Initail Dependency Install 
# -----------------------------------------
FROM node:alpine AS production-setup

# Set the node environment
# This also means only prodcution npm's are installaed
ENV NODE_ENV production

ARG PROJECT_DIRECTORY
RUN test -n "$PROJECT_DIRECTORY" || (echo "PROJECT_DIRECTORY  not set" && false)

# Create the app working directory
WORKDIR /app

# Copy the package.json from the app specific directory
# and hte lock file from the root directory
COPY apps/$PROJECT_DIRECTORY/package.json  /app
COPY package-lock.json /app

# Install all production dependencies
RUN npm install --only=prod --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
  cat npm-debug.log; \
  fi) && false)

# -----------------------------------------
# Build Container - Build all required projects 
# -----------------------------------------
FROM builder-setup as builder

ENV NODE_ENV development
ARG PROJECT_DIRECTORY

# Copy all files required to build the projects
COPY angular.json tsconfig.base.json tsconfig.json /tmp/

# Copy all src files
COPY apps/$PROJECT_DIRECTORY/ /tmp/apps/$PROJECT_DIRECTORY

# Copy all libs. 
# Note: only the required libs will be build in the dist folder and coppied into production
COPY libs /tmp/libs

# Run the production build task (from app specifig package.json)
COPY apps/$PROJECT_DIRECTORY/package.json  /tmp

# Make the output directory
RUN mkdir -p /tmp/dist
WORKDIR /tmp

RUN npm run build

# -----------------------------------------
# Production Container 
# -----------------------------------------
FROM production-setup as production

ENV NODE_ENV production
ARG PROJECT_DIRECTORY

# Copy the distribution folder from the builder container
COPY --from=builder /tmp/dist /app

WORKDIR $PROJECT_DIRECTORY

# Expose port 3000
# This port must match the port for the K8's continer health probe
# It must be exposed else the probe will fail
EXPOSE 3000

# Run the start command
CMD node main.js
