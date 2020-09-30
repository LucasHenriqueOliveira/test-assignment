FROM node:alpine3.10

RUN apk add tzdata
RUN ls /usr/share/zoneinfo

RUN cp usr/share/zoneinfo/America/Los_Angeles /etc/localtime

RUN date


WORKDIR /usr/src/app

COPY . .

EXPOSE 3004

CMD [ "node", "src/index.js" ]