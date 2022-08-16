import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";

import { PasoDatosService } from "src/app/services/paso-datos.service";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage implements OnInit {

  private selectedId : string; 
  @Output() onSelectedId = new EventEmitter<string>();

  constructor( private pasoDatos : PasoDatosService ) {
    this.onSelectedId.subscribe( (clubId : string) => {
      this.selectedId = clubId;
    });

  }

  ngOnInit() {
  }

  /**
   * @deprecated use "onSelectedId.emit( newVvalue )"
   * @param selectedId 
   */
  setSelectedId( selectedId : string ){
    this.selectedId = selectedId;
  }

  getSelectedId( ) {
    return this.selectedId;
  }

}



