import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


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
    this.route.params.subscribe( (params) => {
      this.db.getClub( params.clubId )
        .then( (club) => {
          console.log( "clubList value");
          console.log( club );
          this.club = club;
          this.nombre = club.nombre;
          if( club.deporte ){
            this.db.getDeporte( club.deporte )
              .then( deporte => this.selectedDeporte = deporte.deporte );
          }
        });
    });
  }


  onClickCambiar() {
    this.club.nombre = this.nombre;
    if( this.selectedDeporte )
      this.club.deporte = this.selectedDeporte;
    this.db.updateClub( this.club.id, this.club )
      .then( (docRef) => {
        this.sendToast( `Club ${this.nombre} se ha cambiado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
      });
      this.router.navigate( ['/admin/clubes'] );
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


