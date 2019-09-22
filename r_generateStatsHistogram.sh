#!/bin/sh

# Adapted from https://toedter.com/2018/06/02/heroku-docker-deployment-update/
#
#

curl -n -X PATCH https://api.heroku.com/apps/$APP_NAME/formation
