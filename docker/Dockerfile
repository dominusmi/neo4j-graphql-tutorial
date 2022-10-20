FROM node:16-bullseye-slim

WORKDIR /backend

COPY package*.json ./

RUN npm install

EXPOSE 4001

ENTRYPOINT ["npm", "run", "start:dev"]