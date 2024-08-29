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
import { Usuario } from "../../../modelo/usuario";

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
    this.refreshUsuarioList();
  }

  getSelectedId(){
    return this.currentId;
  }

  private refreshUsuarioList() {
    this.db.getUsuario( )
    .then( (usuariosList) => {
      this.usuarios = [];
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
            this.db.delUsuario( this.currentId );
            this.refreshUsuarioList();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected( usuario: Usuario ) {
    if( usuario )
      this.currentId = usuario.id; 
    else
      this.currentId = null;
  }

}
