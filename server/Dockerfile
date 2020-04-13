#server
FROM node:current-slim

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 82
CMD ["npm","run","start"]
