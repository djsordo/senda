import { TestBed } from '@angular/core/testing';

import { MarcadorService } from './marcador.service';

describe('MarcadorService', () => {
  let service: MarcadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
