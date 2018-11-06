ARG NODE_JS_VERSION=8
FROM node:${NODE_JS_VERSION}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "ci" ]
