import { TestBed } from '@angular/core/testing';

import { BDGeneralService } from './bdgeneral.service';

describe('BDGeneralService', () => {
  let service: BDGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
