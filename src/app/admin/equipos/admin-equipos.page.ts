import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";


@Component({
  selector: 'app-admin-equipos', 
  templateUrl: './admin-equipos.page.html', 
  styleUrls : ['./admin-equipos.page.scss']
})
export class AdminEquiposPage implements OnInit {

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



