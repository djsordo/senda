import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


import { environment } from 'projects/mobile/src/environments/environment';
import { EventosService } from './eventos.service';

describe( 'EventoPrototipoService', () => {

  let eventosService: EventosService;

  beforeAll( () => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
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

