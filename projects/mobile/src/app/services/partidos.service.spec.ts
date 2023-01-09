import { TestBed } from '@angular/core/testing';
import { provideFirestore, 
  getFirestore, 
  QuerySnapshot,
  DocumentData,
  Timestamp} from "@angular/fire/firestore";
import { initializeApp, 
  provideFirebaseApp } from '@angular/fire/app';

import { environment } from './../../environments/environment';
import { PartidosService } from './partidos.service';
import { Partido } from '../modelo/partido';
import { Subscription } from 'rxjs';

fdescribe('PartidosService', () => {
  let partidosService: PartidosService;
  let subscriptions : Subscription[];

  beforeAll( (callMeOnFinish) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    partidosService = TestBed.inject( PartidosService );
    callMeOnFinish();
  });

  beforeEach(() => { /* do nothing */ });

  afterAll( () => {
    subscriptions.forEach( (subscription:Subscription) => subscription.unsubscribe() );
  });

  it('should be created', () => {
    expect(partidosService).toBeTruthy();
  });

  it('creacion de partidos funciona', ( callMeOnFinish ) => {
    let p = {} as Partido;
    p.equipoId = 'prueba-rlunaro';
    p.fecha = Timestamp.now();
    p.rival = 'prueba2-rlunaro';
    p.temporadaId = '2022-23';
    p.tipo = 'liga';
    p.ubicacion = 'Selecto descampado a 4 las afueras de Valladolid';
    partidosService.addPartido( p )
      .then( (docSnap) => {
        console.log(docSnap);
        // if reached this point the test is considered valid
        expect( true ).toBeTrue();
        callMeOnFinish();
      });
  });

  it('prueba de obtener partidos', ( callMeOnFinish ) => {
    partidosService.getPartidosCallback( ( qSnapshot : QuerySnapshot<DocumentData> ) => {
      console.log( qSnapshot );
      console.log( 'examinando lista de componentes' );
      for( let docSnap of qSnapshot.docs ){
        console.log( docSnap.id );
        console.log( docSnap.data() );
        expect( docSnap.data() ).toBeTruthy();
      }
      callMeOnFinish();
    });
  });

  it('prueba de getPartidos de un equipo dado', (callMeOnFinish) => {
    let equipoId = '5IQaM5kLDoc2ng8Drsdw';
    let partidosSub = partidosService.getPartidos( equipoId )
      .subscribe( (partidos) => {
        console.log( partidos );
        callMeOnFinish();
      } );
    subscriptions.push( partidosSub );
  });

});
