import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { AlertController } from "@ionic/angular";

import { EquipoService } from "projects/mobile/src/app/services/equipo.service";
import { StringUtil } from "projects/mobile/src/app/services/string-util";
import { AdminEquiposPage } from "../admin-equipos.page";
import { Db } from "../../../services/db.service";
import { Equipo } from "../../../modelo/equipo";
import { Evento } from "../../../modelo/evento";
import { Partido } from "../../../modelo/partido";
import { EstadPartido } from "../../../modelo/estadPartido";
import { Jugador } from "../../../modelo/jugador";
import { EstadJugador } from "../../../modelo/estadJugador";

@Component({
  selector: 'equipos-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() equipos : any = [];
  searchText : string = '';
  currentId : string;

  constructor( private mainPage : AdminEquiposPage, 
              private db : Db,
              private equipoService : EquipoService,
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.refreshEquipoList();
    this.currentId = null;
  }

  public onClickSearch() {
    this.refreshEquipoList();
  }

  getSelectedId(){
    return this.currentId;
  }

  private refreshEquipoList() {
    this.db.getEquipo()
      .then( equipoList => {
        this.equipos = [];
        for( let equipo of equipoList )
          if( this.matchesSearch( equipo, this.searchText ) )
            this.equipos.push( equipo );
      });
  }


  private matchesSearch( equipo: any, searchText : string ){
    const composedInfo = equipo.nombre + ' ' 
                  + equipo?.genero + ' ' 
                  + equipo?.temporada.nombre;
    if( searchText )
      return this.stringUtil.like( composedInfo, searchText );
    else
      return true;
  }

  async onClickBorrar() {
    const alert = await this.alertController.create({
      header: '¿Seguro? Borraremos las estadísticas y partidos que haya de este equipo',
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
            Promise.all([
              this.db.getEvento(null)
                .then( (evtList : Evento[] ) => {
                  for( let evento of evtList ){
                    if( evento.equipoId === this.currentId )
                      this.db.delEvento( evento.id );
                  }
                }), 
              this.db.getPartido(null)
                .then( (partidoList : Partido[] ) => {
                  for( let partido of partidoList ){
                    if( partido.equipoId === this.currentId )
                      this.db.delPartido( partido.id ); 
                      this.db.getEstadPartidos( null ) 
                        .then( (estadPartidosList : EstadPartido[]) => {
                          for( let estadPartido of estadPartidosList ){
                            if( estadPartido.partidoId === partido.id )
                              this.db.delEstadPartidos( estadPartido.id );
                          }
                        } );
                  }
                }), 
                this.db.getEstadJugador(null)
                  .then( (estadJugadorList: EstadJugador[]) => {
                    for( let estadJugador of estadJugadorList ){
                      if( estadJugador.partidoId === this.currentId )
                        this.db.delEstadJugador( estadJugador.id );
                    }
                  })
             ]);
            this.equipoService.deleteEquipoById( this.currentId );
            this.mainPage.onSelectedId.emit( null );
            this.refreshEquipoList();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected( equipo : Equipo | null ) {
    if( equipo )
      this.currentId = equipo.id;
    else
      this.currentId = null;
  }

}
