FROM node:14-alpine
WORKDIR /app/
COPY . .
RUN yarn install
EXPOSE 4000
CMD ["yarn", "start"]