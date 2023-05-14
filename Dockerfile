FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY myUserApp.js .
EXPOSE 8080
CMD ["node", "myUserApp.js"]