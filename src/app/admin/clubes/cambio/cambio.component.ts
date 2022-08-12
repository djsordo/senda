import { Component, OnInit } from '@angular/core';
import { DeportesService } from 'src/app/services/deportes.service';
import { AdminClubesPage } from '../admin-clubes.page';

@Component({
  selector: 'clubes-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  nombre : string; 
  deportes : string[];

  constructor( private mainPage : AdminClubesPage,
               private deportesService : DeportesService ) { }

  ngOnInit() {
    this.deportesService.getDeportes()
      .then( (docList) => {
          this.deportes = [];
          for( let docSnap of docList.docs ){
            this.deportes.push( docSnap.data()['nombre'] );
          }
      })
  }

  onClickCrear() {
    console.log("añadimos ", this.nombre, " a la base de datos" );
  }

  onClickCancel() {
    this.mainPage.setCurrentButton( '' );
  }

  getDeportes() {
    return this.deportes;
  }

}
