ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:1745a99b66da41b5ccd6f7be3810f74ddab16eb4579de10de378adb50d2e6e6f:$NODE_VERSION

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
