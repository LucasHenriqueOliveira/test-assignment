FROM  node:lts as builder

RUN apt-get install tzdata
RUN ls /usr/share/zoneinfo

RUN cp usr/share/zoneinfo/America/Los_Angeles /etc/localtime

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i
COPY . ./
EXPOSE 3004

CMD [ "node", "src/index.js" ]