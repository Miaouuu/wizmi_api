FROM node:16.13.1-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
