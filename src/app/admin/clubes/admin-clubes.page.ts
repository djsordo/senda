import { Component, 
          EventEmitter, 
          Input, 
          OnInit, 
          Output } from "@angular/core";
import { DocumentData } from "firebase/firestore";
import { Club } from "src/app/modelo/club";
import { ClubesService } from "src/app/services/clubes.service";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage implements OnInit {

  @Input() prueba : DocumentData[] = [];

  constructor( private clubesService : ClubesService ){
  }

  ngOnInit(): void {
    this.clubesService.getClubes()
      .then( (clubList) => {
        for( let docSnap of clubList.docs ){
          console.log( docSnap.data() );
          this.prueba.push( docSnap.data() );
        }
      });
  }

}

