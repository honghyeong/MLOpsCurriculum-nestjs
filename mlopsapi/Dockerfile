FROM node:14-alpine

WORKDIR /usr/src/app

COPY *.json ./
COPY *.lock ./
RUN yarn install --force

COPY . .

RUN yarn build
EXPOSE 3000

CMD ["yarn","start"]