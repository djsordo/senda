import { TestBed } from '@angular/core/testing';
import { IonGrid } from '@ionic/angular';
import { StringUtil } from './string-util';


fdescribe( 'string-util.spec', () => {

  let stringUtil : StringUtil; 

  beforeAll( () =>  {
    stringUtil = new StringUtil();
  })

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


});