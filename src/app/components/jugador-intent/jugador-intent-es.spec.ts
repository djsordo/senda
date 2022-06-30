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

  it('no reconoce a jugador por ser ambiguo', () => {
    let result = jugadorIntent.parseSentence( "gol de dani" );
    expect( result ).toBeFalsy();
  });

  it('reconoce a jugador por nombre y apellido', () => {
    let result = jugadorIntent.parseSentence( "gol de dani vaquero" );
    expect( result ).toBeTruthy();
    expect( result.accion.id === 'gol' );
    expect( result.jugador.numero === '70' );
  });

  it('reconoce a jugador por apellido', () => {
    let result = jugadorIntent.parseSentence( "gol de vaquero" );
    expect( result ).toBeTruthy();
    expect( result.accion.id === 'gol' );
    expect( result.jugador.numero === '70' );
  });

  it('reconoce a jugador por nombre de pila', () => {
    let result = jugadorIntent.parseSentence( "paradón de césar" );
    expect( result !== null ).toBeTrue();
    expect( result.accion.id === 'parada' ).toBeTrue();
    expect( result.jugador.numero === '28' ).toBeTrue();
    console.log( result );
  });

  it('reconoce a jugador por apellido solamente', () => {
    let result = jugadorIntent.parseSentence("tiro vitores");
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion.id === 'tiro' ).toBeTrue();
    expect( result.jugador.numero === '28' ).toBeTrue();
  });

});


