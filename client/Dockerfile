FROM node:21-alpine3.18

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
