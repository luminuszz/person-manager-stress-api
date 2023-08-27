FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn prisma migrate deploy

CMD ["yarn", "start:dev"]
