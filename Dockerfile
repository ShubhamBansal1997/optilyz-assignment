FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000 5000

#Build to project
RUN npm run build

# Run node server
CMD npm run start