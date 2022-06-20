
# Notas

## Despliegue como aplicación web


    ionic build \
    --engine=browser \
    --platform=android

Vamos a crear un bucket en cloud storage, le tenemos que dar 
todos los permisos y además crear un balanceador. Una vez 
hecho todo eso, tenemos que bajarnos la api cli de google y 
configurar nuestras credenciales.


Seguidamente configuraremos la api cli de google:

    gcloud config set account YOUR-GOOGLE-ACCOUNT@gmail.com
    gcloud auth login
    gcloud config set project YOUR-PROJECT-NAME

y ya estaríamos listos para replicar el contenido: 
 
    gsutil rsync -rdm www/ gs://senda-desa-rlunaro/


## Instrucciones para desplegar aplicación Android


    npm install -g native-run cordova-res

    ionic cap add ios 
    ionic cap add android
    ionic cap copy

Cada vez que hagamos cambios: 

     ionic cap sync

Luego hay que abrir con android studio el proyecto y compilar 
la aplicación. 

El fichero ``.apk`` se quedará en: 

    $PROJECT_HOME/android/app/build/outputs/apk/debug/

## Añadiendo text-to-speech

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



