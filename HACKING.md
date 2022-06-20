
# Notas


#!/bin/bash
#
# deploy.sh
#
# instrucciones para desplegar
#
ionic build \
--engine=browser \
--platform=android

# vamos a crear un bucket en cloud storage, le tenemos que dar 
# todos los permisos y además crear un balanceador. Una vez 
# hecho todo eso, tenemos que bajarnos la api cli de google y 
# configurar nuestras credenciales.
# Seguidamente configuraremos la api cli de google:
#
# gcloud config set account YOUR-GOOGLE-ACCOUNT@gmail.com
# gcloud auth login
# gcloud config set project YOUR-PROJECT-NAME
#
# y ya estaríamos listos para replicar el contenido: 
# 
gsutil rsync -rdm www/ gs://senda-desa-rlunaro/


http://34.111.61.73/index.html

angel debe instalarse: 

npm install -g native-run cordova-res


ionic generate service services/senda

ionic cap add ios 
ionic cap add android
ionic cap copy

cada vez que hagamos cambios: 

ionic cap sync


DONDE SE QUEDA EL APK: 

/home/rluna/workspace/senda/android/app/build/outputs/apk/debug/

scp /home/rluna/workspace/senda/android/app/build/outputs/apk/debug/app-debug.apk \
rluna@supermanhamuerto.com:/var/www/supermanhamuerto.com/senda.apk

para guardar cambios 

rsync -avz src/ rluna@supermanhamuerto.com:~/senda 

PRUEBAS TEXT-TO-SPEECH

npm install @capacitor-community/speech-recognition

Añadir esto en ios/App/App/Info.plist: 

<key>NSSpeechRecognitionUsageDescription</key>
<string>To translate voice into words</string>
<key>NSMicrophoneUsageDescription</key>
<string>To record your voice</string>

Añadir esto en android/app/src/main/AndroidManifest.xml: 

esto va al principio, dentro de <manifest>

    <queries>
      <intent>
        <action android:name="android.speech.RecognitionService"/>
      </intent>
    </queries>

Y esto al final: 

    <uses-permission android:name="android.permission.RECORD_AUDIO"/>


Y la MainActivity del proyecto android hay que dejarla así: 


public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    this.registerPlugin( SpeechRecognition.class );

  }



