import { Component, 
          OnInit} from "@angular/core";


@Component({
  selector: 'app-admin-equipos', 
  templateUrl: './admin-equipos.page.html', 
  styleUrls : ['./admin-equipos.page.scss']
})
export class AdminEquiposPage implements OnInit {

  private currentButton : string; 
  private selectedId : string; 

  ngOnInit() {
    this.currentButton = '';
  }

  setCurrentButton( currentButton : string ){
    this.currentButton = currentButton; 
  }

  getCurrentButton() {
    return this.currentButton;
  }

  setSelectedId( selectedId : string ){
    this.selectedId = selectedId;
  }

  getSelectedId( ) {
    return this.selectedId;
  }

}



