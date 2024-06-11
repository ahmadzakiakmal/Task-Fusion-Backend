FROM node:20

WORKDIR /usr/src/app

RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

EXPOSE 80
