import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SpeechRecognition  } from '@capacitor-community/speech-recognition';
import { JugadorIntentEs } from '../components/jugador-intent/jugador-intent-es';
import { Evento } from '../modelo/evento';
import { NavegacionService } from '../services/navegacion.service';
import { PasoDatosService } from '../services/paso-datos.service';
import { ColorScheme, StylesService } from '../services/styles.service';

@Component({
  selector: 'app-microfono',
  templateUrl: './microfono.page.html',
  styleUrls: ['./microfono.page.scss'],
})
export class MicrofonoPage implements OnInit {

  public isAvailable = false;
  public lastText = '';
  private lastEvent : Evento = null;
  private microfonoOn = "./assets/mic-animation.gif";
  private microfonoOff = "./assets/mic-animation-disabled.gif";
  public microfonoImgSrc = this.microfonoOn;

  constructor(  private navegacion : NavegacionService, 
                private intentParser : JugadorIntentEs,
                private pasoDatos : PasoDatosService, 
                private stylesService : StylesService ) {
  }

  ngOnInit() {
    if(this.stylesService.getCurrentMode() === ColorScheme.darkMode ){
      this.microfonoOn = "./assets/mic-animation_dark.gif";
      this.microfonoOff = "./assets/mic-animation-disabled_dark.gif";
    }else{
      this.microfonoOn = "./assets/mic-animation.gif";
      this.microfonoOff = "./assets/mic-animation-disabled.gif";
    }
    this.microfonoImgSrc = this.microfonoOn;
    SpeechRecognition.available()
      .then( value => { this.isAvailable = value['available'];
                        if( this.isAvailable )
                          // only required for android
                          SpeechRecognition.requestPermission();
                          this.startRecognition();
                       } )
      .catch( value => { this.isAvailable = false; } );
  }

  async startRecognition() {
    this.microfonoImgSrc = this.microfonoOn;
    if( this.isAvailable ){
      SpeechRecognition.start({
        partialResults : false,
        popup : false
      }).then( result => {
        if( result.matches && result.matches.length > 0 ) {
          this.lastText = result.matches[0];
          this.onSentenceReady();
          console.log( this.lastEvent );
          this.stopRecognition();
        }
        });
    }
  }

  async stopRecognition() {
    this.microfonoImgSrc = this.microfonoOff;
    if( this.isAvailable )
      SpeechRecognition.stop().then(result => {
      });
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

  public btnSentenceTyped(){
    this.onSentenceReady();
    this.irAtras();
  }

  public onSentenceReady( ) : void {
    const evento : Evento =  this.intentParser.parseSentence( this.lastText );
    if( evento )
      this.pasoDatos.onEventoJugador( evento );
  }

  public irAtras(){
    this.navegacion.back();
  }

}
