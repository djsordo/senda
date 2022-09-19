#!/usr/bin/env pwsh
#
# deploy_web.ps1 - script para desplegar la web
#

if( $args[0] -ne "desa" -and $args[0] -ne "production" -and $args[0] -ne "prod" ) {
  echo "debe indicarse desa o producción"
}else{
  if( $args[0] -eq "desa" ) {
    echo "Building and deploying for development"
    ionic build
    firebase deploy --project senda-desa --only hosting:senda-desa-web
  }
  if( $args[0] -eq "prod" -or $args[0] -eq "production" ){
    echo "Building an deploying for production"
    ionic build --configuration=production
    firebase deploy --project senda-413fe --only hosting:senda-413fe
  }
}

