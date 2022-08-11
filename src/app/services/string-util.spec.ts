import { TestBed } from '@angular/core/testing';
import { StringUtil } from './string-util';


describe( 'string-util.spec', () => {

  let stringUtil : StringUtil; 

  beforeAll( () =>  {
    stringUtil = new StringUtil();
  })

  it( 'simple equal strings', () => {
    expect( stringUtil.like( 'hola', 'hola' ) ).toBeTrue();
  });

});