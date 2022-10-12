#!/bin/bash
#
# deploy.sh - script para desplegar el *.apk generado a una ubicación web
#

#orig=/home/rluna/workspace/senda/android/app/build/outputs/apk/debug/app-debug.apk
orig=/home/rluna/workspace/senda/android/app/release/app-release.apk
orig2=/home/rluna/workspace/senda/android/app/release/senda.apk

# upgrade the version minor number 
echo "Upgrade the version"
read

ionic capacitor sync --configuration=production

echo "Press a key when you are done with building"
read 
mv "$orig" "$orig2"
firebase deploy --project senda-413fe --only hosting:apk-senda

echo "https://apk-senda.web.app/senda.apk"

# DEPRECATED
#dest=rluna@supermanhamuerto.com:~/senda.apk
#scp "$orig2" "$dest"
#ssh rluna@supermanhamuerto.com sudo mv /home/rluna/senda.apk /var/www/supermanhamuerto.com/


