FROM node:7.9.0-alpine

WORKDIR /app
ADD . /app
EXPOSE 3000

RUN npm install
RUN npm run build

CMD npm run serve
