import { Component, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ClubesService } from 'src/app/services/clubes.service';
import { DeportesService } from 'src/app/services/deportes.service';
import { AdminClubesPage } from '../admin-clubes.page';

@Component({
  selector: 'clubes-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  nombre : string; 
  //deportes : string[];
  private deportes : QueryDocumentSnapshot<DocumentData>[];

  constructor( private mainPage : AdminClubesPage,
               private clubesService : ClubesService,
               private deportesService : DeportesService ) { }

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
    console.log("añadimos ", this.nombre, " a la base de datos" );
    // xjx pendiente añadir un club
  }

  onClickCancel() {
    this.mainPage.setCurrentButton( '' );
  }

  getDeportes() {
    return this.deportes;
  }

}
