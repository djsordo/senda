import { TestBed } from '@angular/core/testing';

import { Evento } from '../../modelo/evento';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { JugadorIntentEs } from './jugador-intent-es';
import { PosicionCampo, PosicionPorteria } from 'src/app/services/balonmano.service';

describe('JugadorIntentEs', () => {
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
    expect( result.accion === Acciones.gol );
    expect( result.jugador.numero === '70' );
  });

  it('reconoce a jugador por apellido', () => {
    let result = jugadorIntent.parseSentence( "gol de Vaquero" );
    expect( result ).toBeTruthy();
    expect( result.accion === Acciones.gol );
    expect( result.jugador.numero === '70' );
  });

  it('reconoce a jugador por nombre de pila', () => {
    let result = jugadorIntent.parseSentence( "paradón de César" );
    expect( result !== null ).toBeTrue();
    expect( result.accion === Acciones.parada ).toBeTrue();
    expect( result.jugador.numero === '28' ).toBeTrue();
    console.log( result );
  });

  it('reconoce a jugador por apellido solamente', () => {
    let result = jugadorIntent.parseSentence("tiro vitores");
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion === Acciones.tiro ).toBeTrue();
    expect( result.jugador.numero === '28' ).toBeTrue();
  });

  it('frase compleja 1', () => {
    let result = jugadorIntent.parseSentence('gol de barrio desde seis metros izquierda arriba derecha');
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion === Acciones.gol ).toBeTrue();
    expect( result.jugador.numero === '38' ).toBeTrue();
    expect( result.posicionCampo === PosicionCampo.seis_m_izq).toBeTrue();
    expect( result.posicionPorteria === PosicionPorteria.arriba_derecha).toBeTrue();
  });

  it('frase compleja 2', () => {
    let result = jugadorIntent.parseSentence('parada de óscar otero desde nueve metros centro a abajo izquierda');
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion === Acciones.parada ).toBeTrue();
    expect( result.jugador.numero === '17' ).toBeTrue();
    expect( result.posicionCampo === PosicionCampo.nueve_m_cen ).toBeTrue();
    expect( result.posicionPorteria === PosicionPorteria.abajo_izquierda ).toBeTrue();
  });

  it('frase compleja 3', () => {
    let result = jugadorIntent.parseSentence('tarjeta amarilla de parra');
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion === Acciones.tarjeta_amarilla ).toBeTrue();
    expect( result.jugador.numero === '39' ).toBeTrue();
  });

  it('frase compleja 4', () => {
    let result = jugadorIntent.parseSentence('gol de santiago desde campo contrario a arriba izquierda');
    expect( result !== null ).toBeTrue();
    console.log( result );
    expect( result.accion === Acciones.gol ).toBeTrue();
    expect( result.jugador.numero === '29' ).toBeTrue();
    expect( result.posicionCampo === PosicionCampo.otros ).toBeTrue();
    expect( result.posicionPorteria === PosicionPorteria.arriba_izquierda ).toBeTrue();
  });

});


