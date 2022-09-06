FROM node:latest

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install --omit=dev

COPY ./backend .

RUN npm run build

CMD ["npm", "run", "wait_run"]
