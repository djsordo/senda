import { Component, OnInit } from '@angular/core';
import { Db } from '../../services/db.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  totalClubes : number; 


  constructor( private db : Db ) { }

  ngOnInit() {
    this.db.getClub()
      .then( clubList => {
        this.totalClubes = clubList.length;
      })
  }

}
