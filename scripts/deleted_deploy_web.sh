#!/bin/bash
#
# deploy_web.sh
#


firebase login:use sendaappmail@gmail.com
##firebase login:use senda.developers@gmail.com

if [ "$1" != "desa" ] && [ "$1" != "produccion" ] && [ "$1" != "prod" ] ; then 
  echo "debe indicarse desa o produccion"
else 
  if [ "$1" == "desa" ] ; then 
    echo "Building and deploying for development"
    ionic build 
    firebase deploy --project senda-desa --only hosting:senda-desa-web
    ##firebase deploy --project sendaestadisticas-com-desa --only hosting:sendaestadisticas-com-desa
  fi
  if [ "$1" == "prod" ] || [ "$1" == "produccion" ] ; then 
    echo "Building and deploying for production"
    ionic build --configuration=production
    firebase deploy --project senda-413fe --only hosting:senda-413fe
    ##firebase deploy --project sendaestadisticas-com-prod --only hosting:sendaestadisticas-com-prod
  fi
fi

