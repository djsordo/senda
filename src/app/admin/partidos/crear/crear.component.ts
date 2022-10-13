import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor( private usuarioService : UsuarioService,
               private equipoService : EquipoService, 
               private partidoService : PartidosService, 
               private toastController : ToastController, 
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
    }
  }

  private isPartidoValid( partido : any ) : boolean {
    return true;
  }

  private createPartido( partido: any ){
    this.partidoService.addPartido( partido )
      .then( docRef =>
          this.sendToast( `Partido entre ${this.equipoName} y ${this.rivalName} creado con éxito` ) )
      .catch( reason => 
          this.sendToast( `Se ha producido un error al crear el partido entre ${this.equipoName} y ${this.rivalName}`));
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


