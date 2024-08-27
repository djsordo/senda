import { Component, 
        EventEmitter, 
        Input, 
        OnInit, 
        Output, 
        QueryList, 
        Renderer2, 
        TemplateRef, 
        ViewChildren} from '@angular/core';

@Component({
  selector: 'app-selectable-card-list',
  templateUrl: './selectable-card-list.component.html',
  styleUrls: ['./selectable-card-list.component.scss'],
})
export class SelectableCardListComponent implements OnInit {

  @ViewChildren('selectableCard') resultCards: QueryList<any>;
  @Input() objectList : any[];
  @Input() cardTemplate : TemplateRef<any>;
  @Output() cardSelect = new EventEmitter<any>();

  selectedId : string;

  constructor( private renderer : Renderer2 ) {}

  ngOnInit() {
    this.selectedId = '';
  }

  public onCardSelected( elementId : string ){
    this.resultCards.forEach( (card) => {
       if( card.el.id === elementId ){
        if( card.el.id !== this.selectedId ){
          this.renderer.setStyle( card.el.children[0], "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el.children[0], "color", "var(--ion-color-dark)" );
          this.selectedId = card.el.id;
          this.cardSelect.emit( this.getObjectFromId( this.selectedId ) );
        }else{
          // simulate the efect of another click deslecting the item
          this.renderer.setStyle( card.el.children[0], "background", "" );
          this.renderer.setStyle( card.el.children[0], "color", "rgb( 115, 115, 115)" );
          this.selectedId = null;
          this.cardSelect.emit( null );
        }
      }
      else
        this.renderer.setStyle( card.el.children[0], "background", "" );
    });
  }

  private getObjectFromId( id : string ){
    return this.objectList.find( object => object.id === id );
  }

}
