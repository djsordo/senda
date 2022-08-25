import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { AlertController } from "@ionic/angular";
import { ClubesService } from "src/app/services/clubes.service";

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
  currentId : string;

  constructor( private mainPage : AdminEquiposPage, 
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
    return this.mainPage.getSelectedId();
  }

  private refreshEquipoList() {
    this.equipos = [];
    this.equipoService.getEquipos( )
    .then( (equipoList) => {
      for( let docSnap of equipoList.docs ){
        let equipo = docSnap.data(); 
        equipo['id'] = docSnap.id;
        if( this.matchesSearch( equipo, this.searchText ) ){
          this.equipos.push( equipo );
        }
      }
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
            this.equipoService.deleteEquipoById( this.mainPage.getSelectedId() );
            this.mainPage.onSelectedId.emit( null );
            this.refreshEquipoList();
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
          this.mainPage.onSelectedId.emit( elementId );
          this.currentId = card.el.id;
        }else{
          // simulamos el efecto de que un click en un elemento 
          // seleccionado, deja la selección sin efecto
          this.renderer.setStyle( card.el, "background", "" );
          this.mainPage.onSelectedId.emit( null ); 
          this.currentId = null;
        }
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

}
