#!/usr/bin/env bash
# cleanup docker

docker stop node-mean
docker rm node-mean
docker rmi node-mean

# build docker image
docker build -t node-mean .

# deploy backend
docker run -d -p 3000:3000 --name node-mean node-mean
