import { Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  QueryList, 
  Renderer2,
  ViewChildren} from "@angular/core";
import { DocumentData, DocumentReference, getDoc } from "@angular/fire/firestore";
import { AlertController } from "@ionic/angular";
import { Club } from "src/app/modelo/club";


import { ClubesService } from "src/app/services/clubes.service";
import { DeportesService } from "src/app/services/deportes.service";
import { StringUtil } from "src/app/services/string-util";

@Component({
  selector: 'clubes-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() clubes : any = [];
  @Output() onButton = new EventEmitter<string>();

  searchText : string = '';
  selectedId : string = null; 

  constructor( private clubesService : ClubesService,
              private deportesService : DeportesService,
              private renderer : Renderer2, 
              private alertController : AlertController,
              private stringUtil : StringUtil ){
  }

  ngOnInit(): void {
    this.clubes = [];
    this.clubesService.getClubes( )
    .then( (clubList) => {
      for( let docSnap of clubList.docs ){
        let club = docSnap.data(); 
        club['id'] = docSnap.id;
        if( club?.deporte ){
          this.deportesService.getDoc( club.deporte )
          .then( (doc : DocumentData ) => {
            club['deporte_name'] = doc.data().nombre;
          });
        }
        this.clubes.push( club );
      }
    });
  }

  public onClickSearch() {
    this.clubes = [];
    this.clubesService.getClubes( )
    .then( (clubList) => {
      for( let docSnap of clubList.docs ){
        let club = docSnap.data(); 
        club['id'] = docSnap.id;
        if( club?.deporte ){
          this.deportesService.getDoc( club.deporte )
          .then( (doc : DocumentData ) => {
            club['deporte_name'] = doc.data().nombre;
          });
        }
        if( this.stringUtil.like( club.nombre, this.searchText ) )
          this.clubes.push( club );
      }
    });
  }

  public onClickNuevo( ) {
    this.onButton.emit( 'new' );
  }

  public onClickCambiar( ) {
    this.onButton.emit( 'update' );
  }

  async onClickBorrar() {
    const alert = await this.alertController.create({
      header: '¿Seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // do nothing by now
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log( this.selectedId );
            this.clubesService.deleteClubWhere( "nombre", "==", "los fantasiosos" );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected( elementId : string ) {
    this.selectedId = null;
    this.resultCards.forEach( (card) => {
      if( card.el.id === elementId ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.selectedId = elementId; 
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

}
