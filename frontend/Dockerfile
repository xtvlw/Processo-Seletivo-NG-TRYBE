FROM node:latest

WORKDIR /usr/app

COPY . .

RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm i

EXPOSE 3000

CMD [ "npm", "start" ]
