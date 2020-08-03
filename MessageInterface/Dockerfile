FROM node:13.6.0-alpine3.11
WORKDIR /usr/src/app
COPY . .
RUN npm install --only=production

EXPOSE 1337
ENV PORT=1337
ENV NODE_ENV=production
ENV NOTIF_URI="http://localhost:3004"
ENV MONGODB_URI="mongodb://localhost:27017/stubber"
CMD ["npm","start"]