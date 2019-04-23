#!/usr/bin/env bash
# cleanup docker

docker stop mean-node
docker rm mean-node
docker rmi mean-node

# build docker image
docker build -t mean-node .

# deploy backend
docker run -d -p 3000:3000 --name mean-node mean-node
