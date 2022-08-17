import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
          QuerySnapshot } from '@angular/fire/firestore';


import { EquipoService } from 'src/app/services/equipo.service';
import { AdminEquiposPage } from '../admin-equipos.page';
import { StringUtil, 
          properCase } from 'src/app/services/string-util';

@Component({
  selector: 'equipos-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  nombre : string;
  selectedCategoria : string;
  categorias : Set<string>;
  generos : Set<string>;

  constructor( private mainPage : AdminEquiposPage,
               private equipoService : EquipoService,
               private toastController : ToastController, 
               private stringUtil : StringUtil,
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.initThingsToDo();
    this.equipoService.getEquipos()
      .then( ( equipoList : QuerySnapshot<DocumentData>) => {
        for( let equipo of equipoList.docs ){
          this.thingsToDoPerEquipo( equipo );
        }
      });
  }

  private initThingsToDo(){
    this.categorias = new Set<string>();
    this.generos = new Set<string>();
  }

  private thingsToDoPerEquipo( equipo : DocumentData ){
    if( equipo.data().categoria )
      this.categorias.add( properCase( equipo.data().categoria ) );
    if( equipo.data().genero )
      this.generos.add( properCase( equipo.data().genero ) );
  }

  onClickCrear() {
    // if( this.deportes.length === 1 )
    //   this.selectedDeporte = this.deportes[0];
    // this.clubesService.addClub( this.nombre, this.selectedDeporte.ref )
    //   .then( (docRef) => {
    //     this.sendToast( `Club ${this.nombre} creado con éxito`);
    //   })
    //   .catch( (reason) => {
    //     this.sendToast(`Se ha producido un error al crear el club ${this.nombre}: ${reason}`);
    //   });
    // this.router.navigate( ['..'], { relativeTo : this.route } );
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


