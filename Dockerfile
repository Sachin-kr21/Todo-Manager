FROM node:lts-alpine as base

WORKDIR /user/src/app

COPY package*.json /

RUN npm install

COPY . .

RUN node utils/populateConfig.js

CMD npm run dev 
