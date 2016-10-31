FROM node:4.4.6
ARG PHANTOMJS_CDNURL=""
ARG NPM_CONFIG_REGISTRY=""
ARG SASS_BINARY_SITE=""
RUN mkdir /var/compile
WORKDIR /var/compile
RUN npm install -g phantomjs-prebuilt@2.1.12
ENV PHANTOMJS_BIN phantomjs
COPY package.json /var/compile/
RUN npm install
ENV PHANTOMJS_BIN phantomjs
COPY . /var/compile
RUN npm test
RUN npm run prod
CMD tar -czf - dist