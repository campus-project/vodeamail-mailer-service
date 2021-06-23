#!/bin/bash

docker build . -t tanyudii/vodeamail-mailer-service:latest
docker push tanyudii/vodeamail-mailer-service:latest
