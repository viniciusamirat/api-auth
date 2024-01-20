FROM node:18.17.1

WORKDIR /app/src/

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]