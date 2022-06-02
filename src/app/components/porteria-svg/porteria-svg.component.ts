import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'porteria-svg',
  templateUrl: './porteria-svg.component.html',
  styleUrls: ['./porteria-svg.component.scss'],
})
export class PorteriaSvgComponent implements OnInit {

  public porteriaStyle = { position: 'relative',
            top: 0,
            left: 0  };

  constructor() { }

  ngOnInit() {}

}
