import { TestBed } from '@angular/core/testing';

import { EstadPartidoService } from './estad-partido.service';

describe('EstadPartidoService', () => {
  let service: EstadPartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadPartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
