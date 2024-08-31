#!/bin/bash
#
# deploy_web.sh
#
script_path=$(dirname $0)/deploy_web.mjs
node "$script_path" $1
