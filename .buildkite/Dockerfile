ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:8ec46835f28cc572d67820fc56a6c5ab7d08c6e9b690ae6941aad462943e152e:$NODE_VERSION

# Install required tools
RUN apt-get clean -y && \
  apt-get -qy update && \
  apt-get -y install zip && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
