FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk --update --no-cache add curl

ENV NODE_ENV production
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production && yarn cache clean --force
COPY . /usr/src/app

EXPOSE 8888

CMD [ "yarn", "start" ]
