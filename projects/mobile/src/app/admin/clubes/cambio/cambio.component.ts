import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';


import { AdminClubesPage } from '../admin-clubes.page';
import { Db } from '../../../services/db.service';
import { Club } from '../../../modelo/club';
import { Deporte } from '../../../modelo/deporte';


@Component({
  selector: 'clubes-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  club : Club;
  nombre : string; 
  selectedDeporte : any;
  private deportes : Deporte[];

  constructor( private mainPage : AdminClubesPage,
               private db : Db,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() {
    this.db.getDeporte()
      .then( (deporteList) => {
        this.deportes = deporteList; 
      });
    if( this.mainPage.getSelectedId() ){
      console.log("the selected id", this.mainPage.getSelectedId() );
      this.db.getClub( this.mainPage.getSelectedId() )
        .then( (clubList) => {
          console.log( "clubList value");
          console.log( clubList );
          this.club = clubList[0];
          this.nombre = clubList[0].nombre;
          if( clubList[0].deporte ){
            this.db.getDeporte( clubList[0].deporte )
              .then( deporte => this.selectedDeporte = deporte.deporte );
          }
        });
    }
  }


  onClickCambiar() {
    this.db.updateClub( this.club.id, this.club )
      .then( (docRef) => {
        this.sendToast( `Club ${this.nombre} se ha cambiado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
      });
      this.mainPage.onSelectedId.emit(null);
      this.router.navigate( ['..'], { relativeTo : this.route } );
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

  getDeportes() {
    return this.deportes;
  }

}


