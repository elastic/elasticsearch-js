ARG NODE_VERSION=${NODE_VERSION:-18}
FROM node:$NODE_VERSION

# Install required tools
RUN apt-get clean -y && \
    apt-get -qy update && \
    apt-get -y install zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY . .
RUN npm install --production=false
