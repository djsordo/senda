import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';


import { ClubesService } from 'src/app/services/clubes.service';
import { DeportesService } from 'src/app/services/deportes.service';
import { AdminEquiposPage } from '../admin-equipos.page';

@Component({
  selector: 'equipos-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  nombre : string; 
  selectedDeporte : any;
  private deportes : QueryDocumentSnapshot<DocumentData>[];

  constructor( private mainPage : AdminEquiposPage,
               private clubesService : ClubesService,
               private deportesService : DeportesService, 
               private toastController : ToastController ) { }

  ngOnInit() {
    this.deportesService.getDeportes()
      .then( (docList) => {
          this.deportes = [];
          for( let docSnap of docList.docs ){
            this.deportes.push( docSnap );
          }
      })
  }

  onClickCrear() {
    if( this.deportes.length === 1 )
      this.selectedDeporte = this.deportes[0];
    this.clubesService.addClub( this.nombre, this.selectedDeporte.ref )
      .then( (docRef) => {
        this.sendToast( `Club ${this.nombre} creado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al crear el club ${this.nombre}: ${reason}`);
      })
    
    // return to the search screen
    this.mainPage.setCurrentButton( '' );
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

  onClickCancel() {
    this.mainPage.setCurrentButton( '' );
  }

  getDeportes() {
    return this.deportes;
  }

}


