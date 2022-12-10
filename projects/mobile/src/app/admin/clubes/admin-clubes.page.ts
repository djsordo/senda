import { Component, 
          EventEmitter, 
          OnInit,
          Output} from "@angular/core";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage implements OnInit {

  private selectedId : string; 
  @Output() onSelectedId = new EventEmitter<string>();

  constructor( ) {
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



