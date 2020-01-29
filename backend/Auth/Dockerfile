FROM node:13.6.0-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install --only=production

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

ENV JWT_SECRET="NEVER TELL THIS SECRET TO ANYONE!!"
ENV SALT_ROUNDS=10

CMD ["npm","start"]