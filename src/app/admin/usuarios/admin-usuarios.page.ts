import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";
import { LocalStorage } from "src/app/services/local.storage.mock";
import { LocalStorageService } from "src/app/services/local.storage.service";


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



