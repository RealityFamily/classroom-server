FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

COPY api /usr/src/app
COPY config /usr/src/app
COPY app.js /usr/src/app

EXPOSE 10080

CMD [ "npm", "start" ]
