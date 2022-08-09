import { Component } from "@angular/core";
import { ClubesService } from "src/app/services/clubes.service";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage {

  constructor( private clubesService : ClubesService ){

  }

  async getClubes() {
    return this.clubesService.getClubes();
  }

}

