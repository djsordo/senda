import { Component, OnInit } from "@angular/core";
import { DocumentData, 
        QuerySnapshot} from '@angular/fire/firestore';


import { PartidosService } from "src/app/services/partidos.service";
import { TemporadaService } from "src/app/services/temporada.service";

@Component({
  selector: 'partido-info', 
  templateUrl : './partido-info.component.html'
})
export class PartidoInfoComponent implements OnInit {

  lugares : Set<string>;

  constructor( private partidoService : PartidosService,
               private temporadaService : TemporadaService ){

  }

  ngOnInit(): void {
    this.loadLugares();
    this.loadTemporadas();
  }

  private async loadLugares(){
    this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.lugares = new Set<string>();
        for( let docSnap of docList.docs ){
          this.lugares.add( docSnap.data().ubicacion );
        }
      });
  }

  private async loadTemporadas() {
    // AQUI ME QUEDO, CARGANDO LA LISTA DE TEMPORADAS this.temporadaService.
  }

}



