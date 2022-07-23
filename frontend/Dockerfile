FROM node:current-alpine3.15 AS development

ENV NODE_ENV development

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

COPY ./app/package.json .
COPY ./app/yarn.lock .

RUN yarn install

COPY ./app .

EXPOSE 80

CMD ["yarn", "start"]