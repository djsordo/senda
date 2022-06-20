import { TestBed } from '@angular/core/testing';

import { DbService } from './db.service';

fdescribe( 'EventoPrototipoService', () => {
  let dbService : DbService; 

  beforeEach( () => {
    TestBed.configureTestingModule({});
    dbService = new DbService();
  });

  it('should be created', () =>{
    expect( typeof dbService === 'object'  
            && dbService !== null });

  it('getAll() must return values', () => {
    let prototipos = dbService.getAllEventosPrototipos();
    expect( prototipos !== null 
        && typeof prototipos === 'object'
        && prototipos.length > 0 ).toBe( true );
  });
});

