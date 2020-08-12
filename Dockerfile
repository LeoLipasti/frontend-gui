FROM mhart/alpine-node:12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -rf node_modules
RUN npm install

RUN npm run build

EXPOSE 8096

CMD [ "npm", "start" ]