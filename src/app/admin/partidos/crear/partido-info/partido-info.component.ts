import { Component, OnInit } from "@angular/core";
import { DocumentData, 
        QuerySnapshot} from '@angular/fire/firestore';


import { TemporadaService } from "src/app/services/temporada.service";

@Component({
  selector: 'partido-info', 
  templateUrl : './partido-info.component.html'
})
export class PartidoInfoComponent implements OnInit {

  temporadas : Set<any>;
  selectedTemporada : string;

  constructor( private temporadaService : TemporadaService ){

  }

  ngOnInit(): void {
    this.loadTemporadas();
  }


  private async loadTemporadas() {
    this.temporadaService.getTemporadas()
      .then( (temporadaList : QuerySnapshot<DocumentData>) => {
        this.temporadas = new Set<any>();
        for( let temporadaSnap of temporadaList.docs ){
          let temporada = temporadaSnap.data();
          temporada.id = temporadaSnap.id;
          if( this.isDefaultTemporada( temporada.alias ) )
            this.selectedTemporada = temporada.alias;
          this.temporadas.add( temporada );
        }
      });
  }

  private isDefaultTemporada( temporadaAlias : string ) : boolean {
    let now = new Date();
    let midYear = new Date( now.getFullYear(), 6, 16 );
    let fullCurrentyear = now.getFullYear();
    let fullPrevyear = fullCurrentyear - 1; 
    let fullNextyear = fullCurrentyear + 1; 
    let fullCurrentyear2 = fullCurrentyear.toString().substring(2,4);
    let fullPrevyear2 = fullPrevyear.toString().substring(2,4);
    let fullNextyear2 = fullNextyear.toString().substring(2,4);
    if( now.getTime() > midYear.getTime() ){
      // the default season is CURRENT_YEAR-CURRENT_YEAR+1
      return temporadaAlias.match( new RegExp( `${2020}|${20}-${2022}|${22}` ) );
    }else{
      // the default seasion is CURRENT_YEAR-1-CURRENT_YEAR
      return temporadaAlias.match( new RegExp( `${2020}|${20}-${2022}|${22}` ) );
    }
  }

}



