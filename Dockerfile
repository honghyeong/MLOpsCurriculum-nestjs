FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./mlopsapi/*.json ./
COPY ./mlopspai/*.lock ./
RUN yarn install 

COPY . .

RUN yarn build
EXPOSE 3000

CMD ["yarn","start"]