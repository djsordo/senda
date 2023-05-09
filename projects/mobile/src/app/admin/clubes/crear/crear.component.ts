import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';


import { ClubesService } from 'projects/mobile/src/app/services/clubes.service';
import { DeportesService } from 'projects/mobile/src/app/services/deportes.service';
import { AdminClubesPage } from '../admin-clubes.page';
import { Db } from '../../../services/db.service';
import { Deporte } from '../../../modelo/deporte';

@Component({
  selector: 'clubes-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  nombre : string; 
  selectedDeporte : any;
  private deportes : Deporte[];

  constructor( private db : Db,
               private toastController : ToastController,
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() {
    this.db.getDeporte()
      .then( deportesList => {
        console.log("hemos recibido: ", deportesList );
        this.deportes = deportesList;
      } );
  }

  onClickCrear() {
    if( this.deportes.length === 1 )
      this.selectedDeporte = this.deportes[0];
    this.db.addClub( { nombre: this.nombre, deporte : this.selectedDeporte.id } )
      .then( (_) => {
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


