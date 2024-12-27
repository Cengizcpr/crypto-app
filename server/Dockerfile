FROM node:21-alpine3.18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server /app

EXPOSE 5000

CMD ["npm", "run", "start"]
