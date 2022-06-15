import { Component, 
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
  private microfonoOn = "./assets/mic-animation.gif";
  private microfonoOff = "./assets/mic-animation-disabled.gif";
  public microfonoImgSrc = this.microfonoOn;

  constructor( ) { 
    SpeechRecognition.available()
      .then( value => { this.isAvailable = value['available'];
                        if( this.isAvailable )
                          // only required for android
                          SpeechRecognition.requestPermission();
                       } )
      .catch( value => { this.isAvailable = false; } );
  }

  ngOnInit() {}

  async startRecognition() {
    this.microfonoImgSrc = this.microfonoOn; 
    this.recording = true;
    if( this.isAvailable ){
      SpeechRecognition.start({
        partialResults : false,
        popup : false
      }).then( result => {
        if( result.matches && result.matches.length > 0 ) {
          console.log( result.matches ); 
          this.lastText = result.matches[0];
          this.stopRecognition();
        }
        });
    }
  }

  async stopRecognition() {
    this.microfonoImgSrc = this.microfonoOff;
    this.recording = false; 
    if( this.isAvailable )
      SpeechRecognition.stop().then(result => {
      });
  }

  setShowModal( value : boolean ){
    this.showModal = value; 
    if( this.showModal )
      this.startRecognition();
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


