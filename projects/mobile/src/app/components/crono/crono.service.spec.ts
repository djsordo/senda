import { TestBed } from '@angular/core/testing';

import { CronoService } from './crono.service';

describe('CronoService', () => {
  let service: CronoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
