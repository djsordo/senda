import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DocumentData, QuerySnapshot, Timestamp } from '@angular/fire/firestore';

import { StringUtil } from "projects/mobile/src/app/services/string-util";
import { AdminPartidosPage } from "../admin-partidos.page";
import { PartidosService } from "projects/mobile/src/app/services/partidos.service";
import { Db } from "../../../services/db.service";
import { Partido } from "../../../modelo/partido";

@Component({
  selector: 'usuarios-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() partidos : any = [];
  searchText : string = '';
  currentId : string;

  constructor( private db : Db,
              private mainPage : AdminPartidosPage, 
              private partidoService : PartidosService,
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.partidoService.getPartidosCallback( ( qSnapshot ) => this.refreshEquipoList.apply( this, [ qSnapshot ] ) );
    this.currentId = null;
  }

  public onClickSearch() {
    this.partidoService.getPartidosCallback( ( qSnapshot ) => this.refreshEquipoList.apply( this, [ qSnapshot ] ) );
  }

  getSelectedId(){
    return this.currentId;
  }

  private refreshEquipoList( qSnapshot : QuerySnapshot<DocumentData> ) {
    this.partidos = [];
    for( let docSnap of qSnapshot.docs ){
        try{
          let partido = docSnap.data(); 
          partido['id'] = docSnap.id;
          if( 'equipoId' in partido && partido['equipoId'] )
            this.db.getEquipo( partido['equipoId'] )
              .then( (equipo) => {
                try{
                  partido['equipoText'] = equipo.nombre;
                  partido['categoria'] = equipo.categoria;
                  partido['genero'] = equipo.genero;
                }catch( error ){
                  partido['equipoText'] = partido['equipoId'];
                  console.error('error getting equipo by id: ', partido['equipoId'] );
                  console.error( error );
                }
              })
              .then( () => {
                if( 'temporadaId' in partido && partido['temporadaId'] )
                  this.db.getTemporada( partido['temporadaId'] )
                    .then( (temporada) => {
                      try{
                        partido['temporadaText'] = temporada.alias;
                      }catch( error ){
                        partido['temporadaText'] = partido['temporadaId'];
                        console.error( 'error getting temporada by id', partido['temporadaId']);
                        console.error( error );
                      }
                    });
              })
              .then( () => {
                partido.hora = this.getHour( partido.fecha );
                if( this.matchesSearch( partido, this.searchText ) ){
                  this.partidos.push( partido );
                }      
              });
        }catch( err ){
          console.error( 'Error in refreshUsuarioList' );
          console.error( err );
        }
    }
  }

  private getHour( fecha : Timestamp ){
    try{
      let d = fecha.toDate();
      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minute}`;    
    }catch( err ){
      // this error can be safely be ignored
      return "";
    }
  }

  private matchesSearch( partido: DocumentData, searchText : string ){
    const composedInfo = `${partido.categoria} ${partido.genero} ${partido.rival} ${partido.ubicacion}`;
    if( searchText )
      return this.stringUtil.like( composedInfo, searchText );
    else
      return true;
  }

  async onClickBorrar() {
    const alert = await this.alertController.create({
      header: '¿Seguro? Se borrarán también las estadísticas y eventos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // no hay necesidad de hacer nada
            // en caso de que el usuario cancele
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            //25/08/2024 - ya no es necesario actualizar el id de partido seleccionado
            //this.mainPage.onSelectedId.emit( null );
            this.db.getEstadJugador(null)
              .then( (estadList) => {
                for( let estad of estadList ){
                  if( estad.partidoId === this.currentId ){
                    this.db.delEstadJugador( estad.id );
                  }
                }
              });
            this.db.getEstadPartidos(null)
              .then( (estadPartidoList) => {
                for( let estad of estadPartidoList ){
                  if( estad.partidoId == this.currentId ){
                    this.db.delEstadPartidos( estad.id );
                  }
                }
              });
            this.db.delPartido( this.getSelectedId() );
            this.partidoService.getPartidosCallback( ( qSnapshot ) => this.refreshEquipoList.apply( this, [ qSnapshot ] ) );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected( partido : Partido ) {
    if( partido ) 
      this.currentId = partido.id; 
    else
      this.currentId = null; 
  }


}



