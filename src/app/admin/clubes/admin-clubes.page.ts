import { Component, 
          ElementRef, 
          Input, 
          OnInit, 
          QueryList, 
          Renderer2,
          ViewChild,
          ViewChildren} from "@angular/core";
import { DocumentData } from "firebase/firestore";
import { ClubesService } from "src/app/services/clubes.service";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() clubes : DocumentData[] = [];
  searchText : string = '';
  selectedId : string = null; 

  constructor( private clubesService : ClubesService,
              private renderer : Renderer2 ){
  }

  ngOnInit(): void {
    this.clubes = [];
    this.clubesService.getClubes( )
    .then( (clubList) => {
      for( let docSnap of clubList.docs ){
        let club = docSnap.data();
        club['id'] = docSnap.id;
        this.clubes.push( club );
      }
    });
  }

  public onClickSearch() {
    this.clubes = [];
    this.clubesService.getClubes( this.searchText )
    .then( (clubList) => {
      for( let docSnap of clubList.docs ){
        this.clubes.push( docSnap.data() );
      }
    });
  }

  public onCardSelected( elementId : string ) {
    this.selectedId = null;
    this.resultCards.forEach( (card) => {
      console.log( card );
      if( card.el.id === elementId ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.selectedId = elementId; 
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

}

