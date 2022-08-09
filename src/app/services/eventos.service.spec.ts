import { TestBed } from '@angular/core/testing';

import { EventosService } from './eventos.service';

fdescribe( 'EventoPrototipoService', () => {
  let eventosService: EventosService;

  beforeEach( () => {
    TestBed.configureTestingModule({});
    eventosService = TestBed.inject( EventosService );
  });

  it('should be created', () => {
    expect( typeof eventosService === 'object'
            && eventosService !== null ).toBe( true );
  });

  it('getAll() must return values', () => {
    const prototipos = eventosService.getAcciones();
    expect( prototipos !== null
        && typeof prototipos === 'object'
        && prototipos.length > 0 ).toBe( true );
  });
});

