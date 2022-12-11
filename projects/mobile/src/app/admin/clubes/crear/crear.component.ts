import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';


import { ClubesService } from 'projects/mobile/src/app/services/clubes.service';
import { DeportesService } from 'projects/mobile/src/app/services/deportes.service';
import { AdminClubesPage } from '../admin-clubes.page';

@Component({
  selector: 'clubes-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  nombre : string; 
  selectedDeporte : any;
  private deportes : QueryDocumentSnapshot<DocumentData>[];

  constructor( private mainPage : AdminClubesPage,
               private clubesService : ClubesService,
               private deportesService : DeportesService, 
               private toastController : ToastController,
               private router : Router, 
               private route : ActivatedRoute ) { }

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
      });
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


