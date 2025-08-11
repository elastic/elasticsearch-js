ARG NODE_VERSION=${NODE_VERSION:-20}
FROM node:latest@sha256:dd5c5e4d0a67471a683116483409d1e46605a79521b000c668cff29df06efd51:$NODE_VERSION

# Install required tools
RUN apt-get clean -y && \
  apt-get -qy update && \
  apt-get -y install zip && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
