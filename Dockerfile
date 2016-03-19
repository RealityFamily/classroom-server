FROM code.fdu13ss.org/node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

COPY api /usr/src/app/api
COPY config /usr/src/app/config
COPY app.js /usr/src/app

EXPOSE 10010

CMD [ "npm", "start" ]
