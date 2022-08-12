import { Component, 
          OnInit} from "@angular/core";


@Component({
  selector: 'app-admin-clubes', 
  templateUrl: './admin-clubes.page.html', 
  styleUrls : ['./admin-clubes.page.scss']
})
export class AdminClubesPage implements OnInit {

  private currentButton : string; 

  ngOnInit() {
    this.currentButton = '';
  }

  setCurrentButton( currentButton : string ){
    this.currentButton = currentButton; 
  }

  getCurrentButton() {
    return this.currentButton;
  }


}



