#!/bin/bash
#
# deploy_web.sh
#
script_path=$(dirname $0)/deploy_web.js
node "$script_path" $1
