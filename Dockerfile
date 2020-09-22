FROM node:12.18-alpine3.11

WORKDIR /app

COPY package.json ./

RUN npm install

COPY src/ ./

CMD [ "npm", "start" ]
