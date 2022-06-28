import { TestBed } from '@angular/core/testing';

import { Evento } from '../../modelo/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { JugadorIntentEs } from './jugador-intent-es';

fdescribe('JugadorIntentEs', () => {
  let jugadorIntent : JugadorIntentEs; 
  
  beforeEach( () => {
    TestBed.configureTestingModule({});
    jugadorIntent = TestBed.inject( JugadorIntentEs );
  });

  it('should create', () => {
    expect( jugadorIntent ).toBeTruthy();
  });

  it('simple intent 1', () => {
    debugger;
    let result = jugadorIntent.parseSentence( "gol de dani" );
    expect( result !== null );
    expect( result.accion.id === 'gol' ).toBeTrue();
    //expect( result.jugador.numero === '70' ).toBeTrue();
    console.log( result );
  });

  it('simple intent 2', () => {
    debugger;
    let result = jugadorIntent.parseSentence( "paradón de césar" );
    expect( result !== null );
    expect( result.accion.id === 'parada' ).toBeTrue();
    //expect( result.jugador.numero === '70' ).toBeTrue();
    console.log( result );
  });

});


