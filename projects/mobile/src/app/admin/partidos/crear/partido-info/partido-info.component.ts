import { Component, OnInit } from "@angular/core";
import { DocumentData, 
        DocumentSnapshot, 
        QuerySnapshot} from '@angular/fire/firestore';
import { PartidosService } from "projects/mobile/src/app/services/partidos.service";


import { TemporadaService } from "projects/mobile/src/app/services/temporada.service";
import { CrearComponent } from "../crear.component";
import { Db } from "projects/mobile/src/app/services/db.service";
import { Temporada } from "projects/mobile/src/app/modelo/temporada";
import { ListItem } from "projects/mobile/src/app/modelo/config";

@Component({
  selector: 'partido-info', 
  templateUrl : './partido-info.component.html'
})
export class PartidoInfoComponent implements OnInit {

  temporadas : Set<string>;
  tipos : ListItem[];
  // fecha must be in ISO format (yyyy-mm-dd)
  fecha : string;
  // hora must be in format HH:MM or HH:MM:SS
  hora : string;
  selectedTemporada : string;
  selectedTipo : string;
  maxJornada : number;
  jornada : number;
  numPartes: number; 
  minutosParte: number; 

  constructor( private db : Db,
               private temporadaService : TemporadaService,
               private partidoService : PartidosService,
               private crearComponent : CrearComponent ){
  }

  ngOnInit(): void {
    Promise.all( [
      this.loadTemporadas(),
      this.loadTiposPartidos(),
      this.loadNumJornada()  
    ] )
    .then( ( _ ) => {
      console.log("todo lo demas");
      if( this.crearComponent.isCreation() ){
        if( this.tipos.length > 0 )
          this.selectedTipo = this.tipos[0].id;
        this.selectedTemporada = this.selectSuitableTemporada();
        this.jornada = this.maxJornada+1;
      }else{
        this.fecha = this.crearComponent.partidoInfo.fecha;  
        this.hora = this.crearComponent.partidoInfo.hora;
        this.db.getTemporada( this.crearComponent.partidoInfo.temporadaId )
          .then( ( temporada : Temporada ) => {
            this.selectedTemporada = temporada.alias;
          });
        this.selectedTipo = this.crearComponent.partidoInfo.tipo; 
        this.jornada = this.crearComponent.partidoInfo.jornada;
        this.numPartes = this.crearComponent.partidoInfo.numPartes; 
        this.minutosParte = this.crearComponent.partidoInfo.minutosParte;
      }
    } );
  }


  private selectSuitableTemporada() : string {
    for( let temporadaAlias of this.temporadas ){
      if( this.isDefaultTemporada( temporadaAlias ) ){
        return temporadaAlias;
      }
    }
    return this.temporadas[0];
  }

  private loadTemporadas() {
    return this.db.getTemporada(null)
        .then( (temporadaList : Temporada[] ) => {
          console.log( "paso por loadTemporadas ");
          this.temporadas = new Set<any>();
          for( let temporada of temporadaList ){
            this.temporadas.add( temporada.alias );
          }
        }); 
  }

  private loadTiposPartidos(){
    return this.db.getConfig("config")
      .then( (config) => {
        console.log( "load tipos partidos" );
        this.tipos = config.tipos_partido; 
      } );
  }

  private loadNumJornada(){
    return this.partidoService.getPartidosAsDoc()
      .then( (partidosList : QuerySnapshot<DocumentData>) => {
        console.log("load num jornadas");
        this.maxJornada = 0;
        for( let partidoSnap of partidosList.docs ){
          let partido = partidoSnap.data();
          if( partido.jornada > this.maxJornada ){
            this.maxJornada = partido.jornada;
          }
        }
      });
  }

  public isCreation(){
    return this.crearComponent.isCreation();
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
    let fullCurrentyear2 = fullCurrentyear.toString().substring(2,4);
      // the default season is CURRENT_YEAR-NEXT_YEAR+1
      return temporadaAlias.match( 
          new RegExp( `((${fullCurrentyear})|(${fullCurrentyear2}))\s*`+
                      `\-\s*((${fullNextyear})|(${fullNextyear2}))` ) )?true:false;
    }else{
      // the default seasion is PREV_YEAR-CURRENT_YEAR
      return temporadaAlias.match( 
        new RegExp( `((${fullPrevyear})|(${fullPrevyear2}))\s*`+
                    `\-\s*((${fullCurrentyear})|(${fullCurrentyear2}))` ) )?true:false;
    }
  }

  public onCreatePartido(){
    let temporadaId : string = null; 
    this.temporadaService.getTemporadas( this.selectedTemporada )
    .then( (qSnap : QuerySnapshot<DocumentData>) => {
      if( qSnap.docs.length > 0 ){
        let doc = qSnap.docs[0]; 
        temporadaId = doc.id;
        this.crearComponent.setInfo({ 
          "fecha" : this.fecha, 
          "hora" : this.hora, 
          "temporadaId": temporadaId, 
          "tipo" : this.selectedTipo,
          "jornada" : this.jornada, 
          "config" : {
            "partes": this.numPartes, 
            "segsParte": this.minutosParte * 60 }
        });
        this.crearComponent.verifyAndUpdatePartido();
      }
    });
  }

}



