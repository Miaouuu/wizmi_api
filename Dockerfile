FROM node:16.13.1-alpine
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node
WORKDIR /usr/src/app
COPY . .
RUN pnpm install
