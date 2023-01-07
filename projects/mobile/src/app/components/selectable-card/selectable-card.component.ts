import { Component, 
        Input, 
        OnInit } from '@angular/core';


@Component({
  selector: 'selectable-card',
  templateUrl: './selectable-card.component.html',
  styleUrls: ['./selectable-card.component.scss'],
})
export class SelectableCardComponent implements OnInit {

  @Input() id : string;
  @Input() icon : string;
  @Input() title : string;
  @Input() content : string; 

  constructor() { }

  ngOnInit() {
  }

}
