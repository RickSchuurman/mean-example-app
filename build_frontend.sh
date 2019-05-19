#!/usr/bin/env bash

# cleanup docker

docker stop nginx-mean
docker rm nginx-mean
docker rmi nginx-mean

# build frontend
npm run build -- --output-path=./dist/out --configuration production
docker build -t nginx-mean .

# deploy frontend
docker run -d -p 80:80 --name nginx-mean nginx-mean
