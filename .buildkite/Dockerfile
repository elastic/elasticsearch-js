ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:ac6abe7d72fe2a535b331d862bf01e064abfd65c7b085c3ca6a51869014474a0:$NODE_VERSION

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
