import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognition  } from '@capacitor-community/speech-recognition';


@Component({
  selector: 'microfono',
  templateUrl: './microfono.component.html',
  styleUrls: ['./microfono.component.scss'],
})
export class MicrofonoComponent implements OnInit {

  showModal = false;
  recording = false;
  lastText = '';

  constructor( private changeDetectorRef : ChangeDetectorRef ) { 
    // only required for android
    // SpeechRecognition.requestPermission();
  }

  ngOnInit() {}

  async isAvailable() {
    return await SpeechRecognition.available();
  }

  async startRecognition() {
    const isAvailable = await SpeechRecognition.available();

    if( isAvailable ){
      this.recording = true;
      SpeechRecognition.start({
        prompt : "Di \"Perico marca gol desde posición central\"",
        partialResults : true,
        popup : false
      });

      SpeechRecognition.addListener('partialResults', (data:any) => {
        console.log( 'partial results fired' );
        console.log( data.matches );
        /*
        en IOS el resultado se encuentra en data.matches, 
        mientras que en Android se encuentra en data.value.
        Esto es así para versión 2.1.0 de SpeechRecognition */
        if( data?.matches && data.matches.length > 0 ) {
          this.lastText = data.matches[0];
          this.changeDetectorRef.detectChanges();
        }
        if( data?.value && data.value.length > 0 ){
          this.lastText = data.value[0];
          this.changeDetectorRef.detectChanges();
        }
      } );
    }
  }

  async stopRecognition() {
    this.recording = false; 
    await SpeechRecognition.stop();
  }

  setShowModal( value : boolean ){
    console.log('somebody has clicked me');
    this.showModal = value; 
  }

}
