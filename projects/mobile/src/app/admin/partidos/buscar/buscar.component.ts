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
import { EquipoService } from "projects/mobile/src/app/services/equipo.service";
import { TemporadaService } from "projects/mobile/src/app/services/temporada.service";

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

  constructor( private mainPage : AdminPartidosPage, 
              private partidoService : PartidosService,
              private equipoService : EquipoService,
              private temporadaService : TemporadaService,
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
    return this.mainPage.getSelectedId();
  }

  private refreshEquipoList( qSnapshot : QuerySnapshot<DocumentData> ) {
    this.partidos = [];
    for( let docSnap of qSnapshot.docs ){
        try{
          let partido = docSnap.data(); 
          partido['id'] = docSnap.id;
          if( 'equipoId' in partido && partido['equipoId'] )
            this.equipoService.getEquipoById( partido['equipoId'] )
              .then( (equipoDocSnap) => {
                try{
                  partido['equipoText'] = equipoDocSnap.data().nombre;
                  partido['categoria'] = equipoDocSnap.data().categoria;
                  partido['genero'] = equipoDocSnap.data().genero;
                }catch( error ){
                  partido['equipoText'] = partido['equipoId'];
                  console.error('error getting equipo by id: ', partido['equipoId'] );
                  console.error( error );
                }
              })
              .then( () => {
                if( 'temporadaId' in partido && partido['temporadaId'] )
                this.temporadaService.getTemporadaById( partido['temporadaId'] )
                  .then( (temporadaDocSnap) => {
                    try{
                      partido['temporadaText'] = temporadaDocSnap.data().alias;
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
    let d = fecha.toDate();
    let hour = d.getHours().toString().padStart(2, '0');
    let minute = d.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;  
  }

  private matchesSearch( partido: DocumentData, searchText : string ){
    const composedInfo = `${partido.categoria} ${partido.genero} ${partido.rival} ${partido.ubicacion}`;
    if( searchText )
      return this.stringUtil.like( composedInfo, searchText );
    else
      return true;
  }

  async onClickBorrar() {
    console.log( this.getSelectedId() );
    const alert = await this.alertController.create({
      header: '¿Seguro?',
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
            // this.usuarioService.deleteUsuarioById( this.mainPage.getSelectedId() );
            this.partidoService.deletePartidoById( this.currentId );
            this.mainPage.onSelectedId.emit( null );
            this.partidoService.getPartidosCallback( ( qSnapshot ) => this.refreshEquipoList.apply( this, [ qSnapshot ] ) );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected( elementId : string ) {
    this.resultCards.forEach( (card) => {
      if( card.el.id === elementId ){
        if( card.el.id !== this.currentId ){
          this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
          this.mainPage.onSelectedId.emit( elementId );
          this.currentId = card.el.id;
        }else{
          // simulamos el efecto de que un click en un elemento 
          // seleccionado, deja la selección sin efecto
          this.renderer.setStyle( card.el, "background", "" );
          this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
          this.mainPage.onSelectedId.emit( null ); 
          this.currentId = null;
        }
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

}
