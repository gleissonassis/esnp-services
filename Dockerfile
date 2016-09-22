FROM node:4.5

RUN mkdir /src
COPY . /src
WORKDIR /src
RUN npm install

EXPOSE 3000

CMD [ "node", "/src/server.js" ]