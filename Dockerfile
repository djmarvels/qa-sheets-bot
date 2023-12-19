FROM node:14-alpine
WORKDIR /telegram-app/
COPY . .
RUN yarn install
EXPOSE 80
CMD ["yarn", "start"]