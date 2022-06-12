import { ChangeDetectorRef, 
    Component, 
    OnInit } from '@angular/core';
import { SpeechRecognition  } from '@capacitor-community/speech-recognition';


@Component({
  selector: 'microfono',
  templateUrl: './microfono.component.html',
  styleUrls: ['./microfono.component.scss'],
})
export class MicrofonoComponent implements OnInit {

  public isAvailable = false;
  showModal = false;
  recording = false;
  lastText = '';
  private microfonoOn = "../../../assets/mic-animation.gif";
  private microfonoOff = "../../../assets/mic-animation-disabled.gif";
  public microfonoImgSrc = this.microfonoOn;


  constructor( private changeDetectorRef : ChangeDetectorRef ) { 
    SpeechRecognition.available()
      .then( value => { this.isAvailable = value['available'];
                        if( this.isAvailable )
                          // only required for android
                          SpeechRecognition.requestPermission();
                       }, 
             value => { this.isAvailable = false; } );
  }

  ngOnInit() {}

  async startRecognition() {
    this.microfonoImgSrc = this.microfonoOn; 
    this.recording = true;
  if( this.isAvailable ){
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
    this.microfonoImgSrc = this.microfonoOff;
    this.recording = false; 
    if( this.isAvailable )
      await SpeechRecognition.stop();
  }

  setShowModal( value : boolean ){
    this.showModal = value; 
  }

  public onChangeValue( event ){
    this.lastText = event.srcElement.value;
  }

  public onClickMicro(){
    if( this.microfonoImgSrc === this.microfonoOn ){
      this.stopRecognition();
    }else{
      this.startRecognition();
    }
  }

}


