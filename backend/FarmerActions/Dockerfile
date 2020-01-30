FROM node:13.6.0-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install --only=production

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
ENV NOTIF_URI="http://localhost:3004"
ENV MONGODB_URI="mongodb://localhost:27017/stubber"
CMD ["npm","start"]