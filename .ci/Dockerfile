ARG NODE_JS_VERSION=18
FROM node:${NODE_JS_VERSION}

ARG BUILDER_UID=1000
ARG BUILDER_GID=1000
ENV BUILDER_USER elastic
ENV BUILDER_GROUP elastic

# Set user permissions and directory
RUN groupadd --system -g ${BUILDER_GID} ${BUILDER_GROUP} \
    && useradd --system --shell /bin/bash -u ${BUILDER_UID} -g ${BUILDER_GROUP} -m elastic 1>/dev/null 2>/dev/null \
    && mkdir -p /usr/src/elasticsearch-js \
    && chown -R ${BUILDER_USER}:${BUILDER_GROUP} /usr/src/
WORKDIR /usr/src/elasticsearch-js
USER ${BUILDER_USER}:${BUILDER_GROUP}

# Install app dependencies
RUN apt-get clean -y && \
    apt-get update -y && \
    apt-get install -y zip
COPY --chown=$BUILDER_USER:$BUILDER_GROUP package*.json ./
RUN npm install

COPY --chown=$BUILDER_USER:$BUILDER_GROUP . .
