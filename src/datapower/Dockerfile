FROM ibmcom/datapower:latest

MAINTAINER tonyffrench

ENV  DATAPOWER_ACCEPT_LICENSE=true \
     DATAPOWER_INTERACTIVE=true \
     DATAPOWER_FAST_STARTUP=true

COPY . /drouter

HEALTHCHECK --interval=2s --timeout=1s --retries=20 \
    CMD wget -O - -q http://127.0.0.1:8080/healthCheck || exit 1

EXPOSE 8080
