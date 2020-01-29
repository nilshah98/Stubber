FROM node:13.6.0-alpine3.11

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3000

CMD npm start