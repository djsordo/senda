import { TestBed } from '@angular/core/testing';

import { EstadJugadorService } from './estad-jugador.service';

describe('EstadJugadorService', () => {
  let service: EstadJugadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadJugadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
