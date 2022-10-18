import { Component, OnInit } from "@angular/core";
import { DocumentData, 
        QuerySnapshot} from '@angular/fire/firestore';
import { PartidosService } from "src/app/services/partidos.service";


import { TemporadaService } from "src/app/services/temporada.service";
import { CrearComponent } from "../crear.component";

@Component({
  selector: 'partido-info', 
  templateUrl : './partido-info.component.html'
})
export class PartidoInfoComponent implements OnInit {

  temporadas : Set<any>;
  tipos : Set<string>;
  configs : Map<string,any>;
  fecha : string;
  hora : string;
  selectedTemporada : string;
  temporadaId : string;
  selectedTipo : string;
  jornada : string;
  selectedConfig : string;

  constructor( private temporadaService : TemporadaService,
               private partidoService : PartidosService,
               private crearComponent : CrearComponent ){
  }

  ngOnInit(): void {
    this.loadTemporadas();
    this.loadAdditionalData();
    this.jornada = '';
  }


  private async loadAdditionalData(){
    this.partidoService.getPartidosAsDoc()
      .then( (partidosList : QuerySnapshot<DocumentData>) => {
        this.tipos = new Set<string>();
        this.configs = new Map<string,any>();
        for( let partidoSnap of partidosList.docs ){
          let partido = partidoSnap.data();
          this.tipos.add( partido.tipo );
          this.selectedTipo = partido.tipo;
          let partidoConfig = this.convertConfigToString( partido.config ); 
          if( partidoConfig && !this.configs.has( partidoConfig ) ){
            this.configs.set( partidoConfig, partido.config );
            this.selectedConfig = partidoConfig;
          }
        }
      });
  }

  public getConfigKeys() : string[] {
    if( this.configs )
      return Array.from( this.configs.keys() );
    else
      return [];
  }

  private convertConfigToString( partidoConfig : any, template = "#partes partes de #minutos minutos" ) : string {
    if( partidoConfig ){
      template = template.replace( '#partes', partidoConfig.partes );
      template = template.replace( '#minutos', (partidoConfig.segsParte / 60).toString() );
      return template;
    }else{
      return null;
    }
  }

  private async loadTemporadas() {
    this.temporadaService.getTemporadas()
      .then( (temporadaList : QuerySnapshot<DocumentData>) => {
        this.temporadas = new Set<any>();
        for( let temporadaSnap of temporadaList.docs ){
          let temporada = temporadaSnap.data();
          temporada.id = temporadaSnap.id;
          if( this.isDefaultTemporada( temporada.alias ) ){
            this.selectedTemporada = temporada.alias;
          }
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
    this.temporadaId = null; 
    this.temporadaService.getTemporadas( this.selectedTemporada )
    .then( (qSnap : QuerySnapshot<DocumentData>) => {
      if( qSnap.docs.length > 0 ){
        let doc = qSnap.docs[0]; 
        this.temporadaId = doc.id;

        this.crearComponent.setInfo({ 
          "fecha" : this.fecha, 
          "hora" : this.hora, 
          "temporadaId": this.temporadaId, 
          "tipo" : this.selectedTipo,
          "jornada" : this.jornada, 
          "selectedConfig" : this.selectedConfig });
        this.crearComponent.verifyAndCreatePartido();
        
      }
    });

  }

}



