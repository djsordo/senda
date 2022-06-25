import { ComponentFixture, 
          TestBed, 
          waitForAsync } from '@angular/core/testing';
import { JugadorIntentEs } from './jugador-intent-es';

fdescribe('JugadorIntentEs', () => {
  let jugadorIntent = new JugadorIntentEs();

  it('should create', () => {
    expect( jugadorIntent ).toBeTruthy();
  });

  it('parse funcion', () => {
    expect( jugadorIntent.parseIntent( "una prueba" ) ).toBeTrue();
  });
});


