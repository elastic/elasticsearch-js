ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:0b50ca11d81b5ed2622ff8770f040cdd4bd93a2561208c01c0c5db98bd65d551:$NODE_VERSION

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
