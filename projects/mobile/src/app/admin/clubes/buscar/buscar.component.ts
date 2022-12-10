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
import { StringUtil } from "src/app/services/string-util";
import { AdminClubesPage } from "../admin-clubes.page";

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
              private clubesService : ClubesService,
              private deportesService : DeportesService,
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
    this.clubesService.getClubes( )
    .then( (clubList) => {
      for( let docSnap of clubList.docs ){
        let club = docSnap.data(); 
        club['id'] = docSnap.id;
        if( club?.deporte ){
          this.deportesService.getDocByRef( club.deporte )
          .then( (doc : DocumentData ) => {
            club['deporte_name'] = doc.data().nombre;
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
            this.clubesService.deleteClubById( this.mainPage.getSelectedId() );
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
