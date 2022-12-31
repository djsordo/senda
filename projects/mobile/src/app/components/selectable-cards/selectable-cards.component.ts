import { Component, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'app-selectable-cards',
  templateUrl: './selectable-cards.component.html',
  styleUrls: ['./selectable-cards.component.scss'],
})
export class SelectableCardsComponent implements OnInit {

  id : string;
  icon : string;
  title : string;
  content : string; 

  constructor() { }

  ngOnInit() {
    this.id = "2378842";
    this.icon = "football";
    this.title = "titulo del card";
    this.content = "hola, yo soy el contenido del card";
  }

}
