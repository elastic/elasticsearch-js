ARG NODE_JS_VERSION=16
FROM node:${NODE_JS_VERSION}

# Create app directory
WORKDIR /usr/src/app

RUN apt-get clean -y
RUN apt-get update -y
RUN apt-get install -y zip

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .
