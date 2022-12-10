import { Component,
          OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorIntentEs } from '../jugador-intent/jugador-intent-es';


@Component({
  selector: 'microfono',
  templateUrl: './microfono.component.html',
  styleUrls: ['./microfono.component.scss'],
})
export class MicrofonoComponent implements OnInit {

  public constructor( public router : Router ){

  }

  public ngOnInit(): void {
    
  }

}


