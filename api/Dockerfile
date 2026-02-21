FROM node:20-alpine

WORKDIR /api

COPY . .

RUN npm i express
EXPOSE 8080

CMD [ "npm", "start" ]