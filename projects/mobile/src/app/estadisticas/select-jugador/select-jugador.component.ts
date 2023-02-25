import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { Jugador } from '../../modelo/jugador';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-select-jugador',
  templateUrl: './select-jugador.component.html',
  styleUrls: ['./select-jugador.component.scss'],
})
export class SelectJugadorComponent implements OnInit, OnDestroy {

  private paramsSubscription : Subscription;
  public equipoId : string;
  public jugadores : Jugador[];
  public selectedJugador : Jugador;

  constructor( private jugadorService : JugadoresService,
               private route : ActivatedRoute ) { }

  ngOnInit() {
    this.selectedJugador = null; 
    this.paramsSubscription = this.route.params.subscribe( params => {
      this.equipoId = params['equipoId'];
      console.log(`recibido equipoid: ${this.equipoId}`);
      this.loadJugadores( this.equipoId );
    } );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  private loadJugadores( equipoId : string ) {
    this.jugadorService.getJugadoresEquipoArray( equipoId )
    .then( (jugadores) => {
      this.jugadores = jugadores;
      console.log( this.jugadores );
    });
  }

  public onSelectedJugador( jugador : Jugador ){
    console.log( jugador );
    this.selectedJugador = jugador;
  }

}
