ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:a2fea8b0b74b6e828caa6d83f4b2a0dcb2eb1ff90f30205c32f7bd36ddf976c4:$NODE_VERSION

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
