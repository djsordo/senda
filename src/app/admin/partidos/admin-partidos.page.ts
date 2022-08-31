import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";


@Component({
  selector: 'app-admin-partidos', 
  templateUrl: './admin-partidos.page.html', 
  styleUrls : ['./admin-partidos.page.scss']
})
export class AdminPartidosPage implements OnInit {

  private selectedId : string; 
  @Output() onSelectedId = new EventEmitter<string>();

  constructor( ){
    this.onSelectedId.subscribe( (clubId : string) => {
      this.selectedId = clubId;
    });
  }

  ngOnInit() {
  }

  getSelectedId( ) {
    return this.selectedId;
  }

}



