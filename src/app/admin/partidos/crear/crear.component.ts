import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Timestamp} from '@angular/fire/firestore';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/modelo/usuario';
import { LocalStorage } from 'src/app/services/local.storage.mock';
import { EquipoService } from 'src/app/services/equipo.service';
import { Partido } from 'src/app/modelo/partido';
import { fromStringToDate } from 'src/app/services/string-util';
import { PartidosService } from 'src/app/services/partidos.service';

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
  validationMessages : string[];

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
    this.partidoInfo = info; 
  }

  public verifyAndCreatePartido() {
    let partido = {} as Partido;
    partido.equipoId = this.equipoId; 
    partido.fecha = Timestamp.fromDate( fromStringToDate( this.partidoInfo.fecha, 
                                      this.partidoInfo.hora ) );
    partido.rival = this.rivalName;
    partido.temporadaId = null; // PENDIENTE TEMPORADA
    partido.tipo = this.partidoInfo.tipo;
    partido.jornada = this.partidoInfo.jornada;
    partido.ubicacion = this.lugarName;
    // PENDIENTE CONFIG 
    if( this.isPartidoValid( partido ) ){
      this.createPartido( partido );
      this.router.navigate( ['..'], { relativeTo : this.route } );  
    }else{
      console.log( 'faltan datos');
      console.log( this.validationMessages );
    }
  }

  private isPartidoValid( partido : any ) : boolean {
    this.validationMessages = [];
    return this.check( partido.equipoId, "Debes seleccionar un equipo" )
      && this.check( partido.rival, "Debe seleccionarse un rival" )
      && this.check( partido.temporadaId, "Debe seleccionarse una temporada" )
      && this.check( partido.tipo, "Debe seleccionarse un tipo: elige entre partido de liga o amistoso" );
  }

  private check( condition : boolean, message : string ) {
    if( !condition )
      this.validationMessages.push( message );
    return condition;
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
      header: '¿Seguro?',
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
    if( this.validationMessages.length === 0 )
      return "Está todo, bien no sé porqué sale este mensaje";
    else if( this.validationMessages.length === 1 )
      return this.validationMessages[0]; 
    else if( this.validationMessages.length === 2 )
      return this.validationMessages[0] + " y "
          + this.validationMessages[1];
    else 
      return this.validationMessages[0] + " y "
          + (this.validationMessages.length - 1)
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


