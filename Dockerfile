FROM node:latest

LABEL Author="Michal Kalita"

COPY . .

EXPOSE 3000

CMD npm start