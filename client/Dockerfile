#server
FROM node:current-slim

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 443
CMD ["npm","run","start"]
