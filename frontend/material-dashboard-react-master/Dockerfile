FROM node:13.6.0-alpine3.11

COPY package.json ./src/

WORKDIR /src
RUN npm install
COPY . .
EXPOSE 3000

CMD npm start