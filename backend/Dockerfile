FROM node:8
WORKDIR /app
ENV MONGO_PW=mean
ENV JWT_KEY=this_is_a_secret_key
ENV MONGO_URL=54.194.145.161:27017
COPY package.json /app
RUN npm install
COPY . /app
CMD node server.js
EXPOSE 3000
