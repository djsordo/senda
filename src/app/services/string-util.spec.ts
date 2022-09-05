import { TestBed } from '@angular/core/testing';


import { StringUtil, make_id } from './string-util';


describe( 'string-util.spec', () => {

  let stringUtil : StringUtil; 

  beforeAll( () =>  {
    stringUtil = new StringUtil();
  });

  it( 'simple equal strings', () => {
    expect( stringUtil.like( 'hola', 'hola' ) ).toBeTrue();
  });

  it( 'ignore uppercase lowercase', () => {
    expect( stringUtil.like( 'HoLA Lucas', 'hola lucas') ).toBeTrue();
  });

  it( 'ignore sequences of whitespaces', () => {
    expect( stringUtil.like( 'años más\ttarde,       frente al pelotón', 'años más tarde, frente al pelotón') ).toBeTrue();
  });

  it( 'ignore diacritics', () => {
    expect( stringUtil.like( 'años más\ttarde,       frente al pelotón', 'años mas tarde, frente al peloton') ).toBeTrue();
  });

  it( 'test of contains', () => {
    expect( stringUtil.like( 'años más\ttarde,       frente al pelotón', 'años mas tarde') ).toBeTrue();
  });

  it( 'test of contains at the end', () => {
    expect( stringUtil.like( 'años más\ttarde,       frente al pelotón', 'frente al peloton') ).toBeTrue();
  });

  it( 'test of not equality', () => {
    expect( stringUtil.like( 'años más\ttarde,       frente al pelotón', 'años más o menos mas tarde') ).toBeFalse();
  });

  it( 'make_id1', () => {
    expect( make_id( '1234_hola' ) === '1234_hola' ).toBeTrue();
  });

  it( 'make_id2', () => {
    console.log( make_id( '  raúl luña       ' ) );
    expect( make_id( '  raúl luña       ' ) === 'raul_luna' ).toBeTrue();
  });

  it( 'make_id3', () => {
    console.log( make_id( ' el ibex ha ganado un 20%' ) );
    expect( make_id( ' el ibex ha ganado un 20%' ) === 'el_ibex_ha_ganado_20' ).toBeTrue();
  });

  it( 'make_id4', () => {
    console.log( make_id( 'No huyais, cobardes y viles criaturas!!!!' ) );
    expect( make_id( 'No huyais, cobardes y viles criaturas!!!!' ) === 'no_huyais_cobardes_y_viles_criaturas' ).toBeTrue();
  });

  it( 'make_id5', () => {
    console.log( make_id( 'el', 'ibex', 'ha', 'ganado', 'un', '20%' ) );
    expect( make_id( ' el ibex ha ganado un 20%' ) === 'el_ibex_ha_ganado_20' ).toBeTrue();
  });


});