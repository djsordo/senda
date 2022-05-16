import { TestBed } from '@angular/core/testing';

import { SendaService } from './senda.service';

describe('SendaService', () => {
  let service: SendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
