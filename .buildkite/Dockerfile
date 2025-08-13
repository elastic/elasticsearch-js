ARG NODE_VERSION=${NODE_VERSION:-20}
FROM node:latest@sha256:dc4ac80350904c2797058e477a30b6285e9e025f23f139ea8b277c9efe55dd9a:$NODE_VERSION

# Install required tools
RUN apt-get clean -y && \
  apt-get -qy update && \
  apt-get -y install zip && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
