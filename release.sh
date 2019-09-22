#!/bin/sh

# Adapted from https://toedter.com/2018/06/02/heroku-docker-deployment-update/
#
#

APP_NAME=$1
TOKEN=$2

IMAGE_ID=$(docker inspect registry.heroku.com/$APP_NAME/web --format={{.Id}})
PAY_LOAD='{"updates":[{"type":"web","docker_image":"'"$IMAGE_ID"'"}]}'

curl -n -X PATCH https://api.heroku.com/apps/$APP_NAME/formation \
-d "$PAY_LOAD" \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
-H "Authorization: Bearer $TOKEN"
