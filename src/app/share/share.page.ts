import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  isProduction : boolean;

  constructor( private router : Router ) { 
    this.isProduction = environment.production;
  }

  ngOnInit() {
  }

  navigateHome(){
    this.router.navigate( ["/home"] );
  }

}
