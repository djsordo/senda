import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DocumentData, QuerySnapshot, Timestamp} from '@angular/fire/firestore';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/modelo/usuario';
import { LocalStorage } from 'src/app/services/local.storage.mock';
import { EquipoService } from 'src/app/services/equipo.service';
import { Partido } from 'src/app/modelo/partido';
import { fromStringToDate } from 'src/app/services/string-util';
import { PartidosService } from 'src/app/services/partidos.service';
import { TemporadaService } from 'src/app/services/temporada.service';

interface Validation{
  messages: string[], 
  result: boolean 
};

@Component({
  selector: 'usuarios-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  usuario : Usuario;
  equipoId : string; 
  equipoName : string;
  rivalName : string;
  lugarName : string; 
  partidoInfo : any;
  validation : Validation;

  constructor( private usuarioService : UsuarioService,
               private equipoService : EquipoService, 
               private partidoService : PartidosService, 
               private toastController : ToastController, 
               private alertController : AlertController,
               private router : Router, 
               private route : ActivatedRoute,
               private localStorage : LocalStorage ) { }

  ngOnInit() { 
    this.equipoName = null; 
    this.rivalName = null;
    this.lugarName = null;
    this.initCurrentUser();
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD( this.localStorage.getItem('emailUsuario') )
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }
  
  public setEquipoId( equipoId : string ){
    this.equipoId = equipoId;
    this.equipoService.getEquipoById( this.equipoId )
      .then( (equipoSnap) => {
        let equipoData = equipoSnap.data();
        this.equipoName = equipoData.categoria + ' ' +
                          equipoData.genero + ' ' +
                          equipoData.temporada.alias;
      });
  }

  public setRivalName( rivalName : string ){
    this.rivalName = rivalName;
  }

  public setLugar( lugarName : string ){
    this.lugarName = lugarName;
  }

  public setInfo( info : any ){
    console.log( info );
    this.partidoInfo = info; 
  }

  public verifyAndCreatePartido() {
    console.log( this.partidoInfo );
    if( this.isPartidoValid( ) ){
      let partido = {} as Partido;
      partido.equipoId = this.equipoId; 
      partido.rival = this.rivalName;
      partido.ubicacion = this.lugarName;
      partido.fecha = Timestamp.fromDate( fromStringToDate( this.partidoInfo.fecha, 
                        this.partidoInfo.hora ) );
      partido.temporadaId = this.partidoInfo.temporadaId;
      partido.tipo = this.partidoInfo.tipo;
      if( this.partidoInfo.jornada )
        partido.jornada = this.partidoInfo.jornada;
      else 
        partido.jornada = '';
      console.log( this.partidoInfo.config );
      this.createPartido( partido );
      
      this.router.navigate( ['..'], { relativeTo : this.route } );  
    }else{
      this.showAlertValidationFailed();
    }
  }

  private isPartidoValid() : boolean {
    this.validation = { messages: [], result : true };
    this.check( this.validation, this.equipoId, "no se ha seleccionado un equipo" );
    this.check( this.validation, this.rivalName, "no se ha seleccionado un rival" );
    this.check( this.validation, this.partidoInfo.fecha, "no se ha puesto una fecha al partido" );
    this.check( this.validation, this.partidoInfo.temporadaId, "no se ha seleccionado una temporada" );
    this.check( this.validation, this.partidoInfo.tipo, "no se ha seleccionado un tipo de partido: elige entre partido de liga o amistoso" );
    return this.validation.result;
  }

  private check( validation: Validation, condition : any, message : string ) {
    if( !condition )
      this.validation.messages.push( message );
    this.validation.result &&= condition;
  }

  private createPartido( partido: any ){
    this.partidoService.addPartido( partido )
      .then( docRef =>
          this.sendToast( `Partido entre ${this.equipoName} y ${this.rivalName} creado con éxito` ) )
      .catch( reason => 
          this.sendToast( `Se ha producido un error al crear el partido entre ${this.equipoName} y ${this.rivalName}`));
  }

  async showAlertValidationFailed() {
    const alert = await this.alertController.create({
      header: 'Faltan datos',
      message: this.composeMeaningfulMessage(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // no hay necesidad de hacer nada
            // en caso de que el usuario cancele
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            // poner aquí el callback para el caso en que pulse ok
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  private composeMeaningfulMessage() {
    if( this.validation.messages.length === 0 )
      return "Está todo, bien no sé porqué sale este mensaje";
    else if( this.validation.messages.length === 1 )
      return this.validation.messages[0]; 
    else if( this.validation.messages.length === 2 )
      return this.validation.messages[0] + " y "
          + this.validation.messages[1];
    else 
      return this.validation.messages[0] + " y "
          + (this.validation.messages.length - 1)
          + " errores más"; 
  }

  async sendToast( message : string ){
    return this.toastController.create({
      message: message, 
      duration: 2000, 
      position: 'middle'
    }).then( (val : HTMLIonToastElement) => {
      val.present();
    })
  }

}


