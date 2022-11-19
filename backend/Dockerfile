FROM node

WORKDIR /usr/app

COPY . . 

RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 4000

CMD [ "npm", "run", "start" ]
