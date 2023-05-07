import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { AlertController } from "@ionic/angular";

import { StringUtil } from "projects/mobile/src/app/services/string-util";
import { AdminClubesPage } from "../admin-clubes.page";
import { Db } from "../../../services/db.service";

@Component({
  selector: 'clubes-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() clubes : any = [];
  searchText : string = '';
  currentId : string;

  constructor( private mainPage : AdminClubesPage, 
              private db : Db,
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.currentId = null;
    this.refereshClubList();
  }

  public onClickSearch() {
    this.refereshClubList();
  }

  getSelectedId(){
    return this.mainPage.getSelectedId();
  }

  private refereshClubList() {
    this.clubes = [];
    this.db.getClub()
      .then( (clubList) => {
      for( let club of clubList ){
        if( club?.deporte ){
          this.db.getDeporte( club.deporte )
          .then( (deporteList) =>  {
            club['deporte_name'] = deporteList[0].nombre;
          });
        }
        if( this.searchText ){
          if( this.stringUtil.like( club.nombre, this.searchText ) )
            this.clubes.push( club );
        }
        else
          this.clubes.push( club );
      }
    });
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
            this.db.delClub( this.mainPage.getSelectedId() );
            this.mainPage.onSelectedId.emit( null );
            this.refereshClubList();
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
