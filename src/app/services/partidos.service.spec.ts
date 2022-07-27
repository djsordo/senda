import { TestBed } from '@angular/core/testing';

import { PartidosService } from './partidos.service';

describe('PartidosService', () => {
  let service: PartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('un partido se crea sin problemas', () => {
  //   let p = service.newPartido();
  //   p.equipo = "yaveremos";
  //   p.fecha = new Date
  //   service.addPartido

  // });


});
