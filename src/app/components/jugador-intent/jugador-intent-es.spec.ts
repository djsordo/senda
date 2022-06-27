import { ComponentFixture, 
          TestBed, 
          waitForAsync } from '@angular/core/testing';
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

  // it('begins with', () => {
  //   expect( jugadorIntent.testProbe.beginsWith( 
  //     ['gol', 'de', 'dani'], ['gol']
  //   )).toBeTruthy();
  //   expect( jugadorIntent.testProbe.beginsWith(
  //     ['de', 'dany'], ['gol']
  //   )).toBeFalsy();
  // });

  // it('parseOptionalPreposition', () => {

  //   let sentence1 = ['de', 'desde', 'en', 'prueba'];
  //   jugadorIntent.testProbe.parseOptionalPreposition( sentence1 )
  //   expect( sentence1.length === 1 && sentence1[0] === 'prueba' ).toBeTrue();

  //   let sentence2 = ['prueba'];
  //   jugadorIntent.testProbe.parseOptionalPreposition( sentence1 )
  //   expect( sentence2.length === 1 && sentence2[0] === 'prueba' ).toBeTrue();

  // });

  // it('parse function step by step', () =>{
  //   let words = [ 'gol', 'de', 'dani'];
  //   let first = jugadorIntent.testProbe.parseAccion( words );
  //   expect( first ).toBeTrue();
  //   expect( words.length === 2 
  //     && words[0] === 'de' 
  //     && words[1] === 'dani' );

  //   let second = jugadorIntent.testProbe.parseOptionalPreposition( words ); 
  //   expect( second ).toBeTrue();
  //   expect( words.length === 1 && words[1] === 'dani' );

  // });

  it('parse funcion', () => {
    expect( jugadorIntent.parseIntent( "gol de dani" ) ).toBeTrue();
  });

});


