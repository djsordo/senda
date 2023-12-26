import { Component, 
  Input, 
  OnInit, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DocumentData } from '@angular/fire/firestore';

import { StringUtil } from "projects/mobile/src/app/services/string-util";
import { AdminUsuariosPage } from "../admin-usuarios.page";
import { Db } from "../../../services/db.service";

@Component({
  selector: 'usuarios-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() usuarios : any = [];
  searchText : string = '';
  currentId : string;

  constructor( private mainPage : AdminUsuariosPage, 
              private db : Db,
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.refreshUsuarioList();
    this.currentId = null;
  }

  public onClickSearch() {
    console.log( this.searchText );
    this.refreshUsuarioList();
  }

  getSelectedId(){
    return this.mainPage.getSelectedId();
  }

  private refreshUsuarioList() {
    this.usuarios = [];
    this.db.getUsuario( )
    .then( (usuariosList) => {
      for( let usuario of usuariosList ){
        try{
          if( this.matchesSearch( usuario, this.searchText ) ){
            this.usuarios.push( usuario );
          }
        }catch( err ){
          console.error( 'Error in refreshUsuarioList' );
          console.error( err );
        }
      }
    });
  }

  public matchesSearch( usuario: DocumentData, searchText : string ){
    const composedInfo = usuario?.nombre + ' ' 
                  + usuario?.apellidos + ' ' 
                  + usuario?.email + ' ' 
                  + usuario.club?.nombre + ' ';
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
            this.db.delUsuario( this.mainPage.getSelectedId() );
            this.mainPage.onSelectedId.emit( null );
            this.refreshUsuarioList();
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
