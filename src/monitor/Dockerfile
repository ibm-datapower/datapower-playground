FROM node:6-alpine

MAINTAINER tonyffrench

RUN mkdir -p /usr/src/monitor
WORKDIR /usr/src/monitor

COPY . /usr/src/monitor
RUN npm install

CMD [ "npm", "start" ]