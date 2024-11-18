ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:latest@sha256:11ea38054c38143aa6682c39205abeaed1c7f0d3a66d25d8b01e129a0c1480ce:$NODE_VERSION

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
