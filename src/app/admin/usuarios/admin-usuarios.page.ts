import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";


@Component({
  selector: 'app-admin-usuarios', 
  templateUrl: './admin-usuarios.page.html', 
  styleUrls : ['./admin-usuarios.page.scss']
})
export class AdminUsuariosPage implements OnInit {

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



