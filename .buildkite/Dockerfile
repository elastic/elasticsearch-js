ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:e6959489e7af6d1338f71cdd046ca4c9b35fdf723cf20e054f9114875e29ef40:$NODE_VERSION

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
