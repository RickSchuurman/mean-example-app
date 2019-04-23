#!/usr/bin/env bash

# cleanup docker

docker stop mean-nginx
docker rm mean-nginx
docker rmi mean-nginx

# build frontend
npm run build -- --output-path=./dist/out --configuration production
docker build -t mean-nginx .

# deploy frontend
docker run -d -p 80:80 --name mean-nginx mean-nginx
