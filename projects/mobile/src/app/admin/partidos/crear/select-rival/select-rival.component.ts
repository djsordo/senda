import { AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { DocumentData, 
        QuerySnapshot} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";


import { PartidosService } from "projects/mobile/src/app/services/partidos.service";
import { CrearComponent } from "../crear.component";

@Component({
  selector: 'select-rival', 
  templateUrl : './select-rival.component.html',
  styleUrls : [ './select-rival.component.scss' ]
})
export class SelectRivalComponent implements OnInit {

  @ViewChildren('resultCard') resultCards : QueryList<any>;
  rivales : Set<string>;


  public set rivalName( rivalName : string ){
    this.crearComponent.setRivalName( rivalName );
  }

  public get rivalName() {
    return this.crearComponent.rivalName;
  }

  constructor( private partidoService : PartidosService,
               private crearComponent : CrearComponent,
               private renderer : Renderer2, 
               private router : Router,
               private route : ActivatedRoute ){

  }

  ngOnInit(): void {
    this.loadRivales()
    .then( () => {
      this.resultCards.changes.subscribe( () => { 
        this.markAsSelected( this.crearComponent.rivalName ); 
      } );
    } );
    // la subscripción es necesaria para 
    // cuando efectúo cambios en la página
    this.crearComponent.rivalNameChanged.subscribe( (rivalName:string) => {
      console.log( "suscripcion rival: ", rivalName );
      this.markAsSelected( rivalName );   
    });
  }

  public markAsSelected( rivalName : string ){
    this.resultCards.forEach( (card) => {
      if( card.el.id === rivalName ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
      }else{
        // resto de elementos quedarán seleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
  }

  public getEquipoName() : string {
    return this.crearComponent.equipoName;
  }

  private async loadRivales(){
    return new Promise( (resolve, reject) => {
      this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.rivales = new Set<string>();
        for( let docSnap of docList.docs ){
          this.rivales.add( docSnap.data().rival );
        }
        resolve( null );
      });
    });
  }

  public onRivalSelected( rival ){
    this.crearComponent.setRivalName( rival );
    this.router.navigate( ['..', 'lugar'], { relativeTo: this.route } );
  }

}



