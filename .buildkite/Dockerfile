ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:3b73c4b366d490f76908dda253bb4516bbb3398948fd880d8682c5ef16427eca:$NODE_VERSION

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
