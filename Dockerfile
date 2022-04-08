FROM node:14-alpine

WORKDIR /usr/src/app

COPY mlopsapi/*.json ./
# COPY mlopspai/*.lock ./
RUN yarn install --save --legacy-peer-deps

COPY . .

RUN yarn build
EXPOSE 3000

CMD ["yarn","start"]