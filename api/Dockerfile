FROM node:20-alpine

WORKDIR /pagos-api

COPY . .

RUN npm i express
EXPOSE 8080

CMD [ "npm", "start" ]