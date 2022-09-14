#!/bin/bash
#
# deploy_web.sh

if [ "$1" != "desa" ] && [ "$1" != "produccion" ] && [ "$1" != "prod" ] ; then 
  echo "debe indicarse desa o produccion"
else 
  if [ "$1" == "desa" ] ; then 
    echo "Building and deploying for development"
    ionic build 
    firebase deploy --project senda-desa --only hosting:senda-desa-web
  fi
  if [ "$1" == "prod" ] || [ "$1" == "produccion" ] ; then 
    echo "Building and deploying for production"
    ionic build --configuration=production
    firebase deploy --project senda-413fe --only hosting:senda-413fe
  fi
fi

