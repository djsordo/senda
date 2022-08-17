import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { AlertController } from "@ionic/angular";
import { ClubesService } from "src/app/services/clubes.service";

import { DeportesService } from "src/app/services/deportes.service";
import { EquipoService } from "src/app/services/equipo.service";
import { StringUtil } from "src/app/services/string-util";
import { TemporadaService } from "src/app/services/temporada.service";
import { AdminEquiposPage } from "../admin-equipos.page";

@Component({
  selector: 'equipos-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() equipos : any = [];
  searchText : string = '';

  constructor( private mainPage : AdminEquiposPage, 
              private equipoService : EquipoService,
              private clubService : ClubesService,
              private temporadaService : TemporadaService, 
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.refereshEquipoList();
  }

  public onClickSearch() {
    this.refereshEquipoList();
  }

  getSelectedId(){
    return this.mainPage.getSelectedId();
  }

  private refereshEquipoList() {
    this.equipos = [];
    this.equipoService.getEquipos( )
    .then( (equipoList) => {
      for( let docSnap of equipoList.docs ){
        let equipo = docSnap.data(); 
        equipo['id'] = docSnap.id;
        if( equipo?.club ){
          this.clubService.getDocByRef( equipo.club )
            .then( (doc:DocumentData) => {
              equipo.club = {
                'ref' : equipo.club, 
                'nombre' : doc.data().nombre
              };
            });
        }
        if( equipo?.temporada ){
          this.temporadaService.getTemporadaByRef( equipo.temporada )
            .then( (doc : DocumentData) => {
              equipo.temporada = {
                'ref' : equipo.temporada, 
                'alias' : doc.data().alias,
                'nombre' : doc.data().nombre
              }
            });
        }
        if( this.matchesSearch( equipo, this.searchText ) ){
          this.equipos.push( equipo );
        }
      }
    });
  }


  private matchesSearch( equipo: any, searchText : string ){
    const composedInfo = equipo.nombre + ' ' 
                  + equipo?.genero + ' ' 
                  + equipo?.temporada.nombre + ' ' 
                  + equipo?.club.nombre;
    if( searchText )
      return this.stringUtil.like( composedInfo, searchText );
    else
      return true;
  }

  async onClickBorrar() {
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
            this.equipoService.deleteEquipoById( this.mainPage.getSelectedId() );
            this.mainPage.onSelectedId.emit( null );
            this.refereshEquipoList();
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
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.mainPage.onSelectedId.emit( elementId );
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

}
