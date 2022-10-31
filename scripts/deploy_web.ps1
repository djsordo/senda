#!/usr/bin/env pwsh
#
# deploy_web.ps1 - script para desplegar la web
#

$script = $MyInvocation.MyCommand.Path
$scriptPath = Split-Path $script -Parent

node ($scriptPath + "\deploy_web.js") $args

