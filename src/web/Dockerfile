FROM node:6-alpine

MAINTAINER tonyffrench

HEALTHCHECK --interval=2s --timeout=1s --retries=20 \
    CMD wget -O - -q http://127.0.0.1:6001/echo || exit 1

RUN mkdir -p /usr/src/fiddle
WORKDIR /usr/src/fiddle

COPY . /usr/src/fiddle
RUN npm install

EXPOSE 6001

CMD [ "npm", "start" ]