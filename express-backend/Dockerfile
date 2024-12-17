FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "PORT=8080" > .env

RUN npx prisma generate

EXPOSE 8080

CMD ["npx", "ts-node", "index.ts"]
