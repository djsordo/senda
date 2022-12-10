import { TestBed } from '@angular/core/testing';

import { PasoDatosService } from './paso-datos.service';

describe('PasoDatosService', () => {
  let service: PasoDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasoDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
