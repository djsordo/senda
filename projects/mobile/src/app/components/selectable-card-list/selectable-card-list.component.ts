import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectable-card-list',
  templateUrl: './selectable-card-list.component.html',
  styleUrls: ['./selectable-card-list.component.scss'],
})
export class SelectableCardListComponent implements OnInit {

   @Input() objectList : any[];
   @Input() title : string;

  constructor() {}

  ngOnInit() {}

}
