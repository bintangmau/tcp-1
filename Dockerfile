FROM node:12.13

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add @nestjs/cli
RUN yarn install --production=true

COPY . .

EXPOSE 23131

RUN yarn build

CMD ["node", "dist/main"]