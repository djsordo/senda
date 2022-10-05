import { Component, OnInit } from "@angular/core";
import { DocumentData, 
  QueryDocumentSnapshot, 
  QuerySnapshot} from '@angular/fire/firestore';


import { PartidosService } from "src/app/services/partidos.service";

@Component({
  selector: 'select-rival', 
  templateUrl : './select-rival.component.html',
  styleUrls : [ './select-rival.component.scss' ]
})
export class SelectRivalComponent implements OnInit {

  rivalName : string;
  rivales : Set<string>;

  constructor( private partidoService : PartidosService ){

  }

  ngOnInit(): void {
    this.loadRivales();
  }


  private async loadRivales(){
    this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.rivales = new Set<string>();
        for( let docSnap of docList.docs ){
          this.rivales.add( docSnap.data().rival );
        }
      });
  }

  public onRivalSelected( rival ){
    this.rivalName = rival;
  }

}



