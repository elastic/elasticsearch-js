ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:73236efc6d24b792e476251b7bc7b000f45314d0e084dcd6af3d0a54489ad489:$NODE_VERSION

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
