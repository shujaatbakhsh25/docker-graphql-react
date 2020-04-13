#server
FROM node:current-slim

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm","run","start"]
