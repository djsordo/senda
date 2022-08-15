import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';


import { ClubesService } from 'src/app/services/clubes.service';
import { DeportesService } from 'src/app/services/deportes.service';
import { AdminEquiposPage } from '../admin-equipos.page';


@Component({
  selector: 'equipos-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  club : DocumentSnapshot<DocumentData>;
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
    if( this.mainPage.getSelectedId() ){
      this.clubesService.getClubById( this.mainPage.getSelectedId() )
        .then( ( docSnap : DocumentSnapshot<DocumentData> ) => {
          this.club = docSnap;
          this.nombre = docSnap.data().nombre;
          if( docSnap.data().deporte )
            this.selectedDeporte = this.deportesService.getDoc( docSnap.data().deporte );
        });
    }
  }


  onClickCambiar() {
    this.clubesService.updateClub( this.club,
                                    this.nombre )
      .then( (docRef) => {
        this.sendToast( `Club ${this.nombre} se ha cambiado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
      })
    // return to the search screen
    this.mainPage.setCurrentButton( '' );
    this.mainPage.setSelectedId('');
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


