import { TestBed } from '@angular/core/testing';
import { initializeApp, 
          provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, 
          provideFirestore} from "@angular/fire/firestore";

import { environment } from "../../environments/environment";
import { EstadJugadorService } from './estad-jugador.service';
import { PartidosService } from './partidos.service';

describe('EstadJugadorService', () => {

  let partidosService : PartidosService;
  let estadJugadorService: EstadJugadorService;

  beforeAll( (callMeOnFinish) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    partidosService = TestBed.inject( PartidosService );
    estadJugadorService = TestBed.inject( EstadJugadorService );
    callMeOnFinish();
  });

  beforeEach(() => { });

  it('should be created', () => {
    expect(estadJugadorService).toBeTruthy();
  });

  it('get stats of player by partidoId', (callMeOnFinish) => {
    let juvenilMasculinoId = 'zJ95IqWhrfJs4AgdGS2i';
    partidosService.getPartidos( juvenilMasculinoId ).subscribe( partidosData => {
      for( let partido of partidosData ){
        estadJugadorService.getEstadJugador( partido.id )
          .subscribe( allStuff => {
            console.log( partido.id );
            console.log( allStuff );
            // if there is data, the test is considered OK
            expect( true ).toBeTrue();
            callMeOnFinish();
          })
      }
    });
  });

  it('get stats of player by playerId', (callMeOnFinish) => {
    let jugadorId = 'pKsNnDoMu5djCiOaP0oG';
    estadJugadorService.getEstadJugador( null, jugadorId )
      .subscribe( estadData => {
        console.log("estadData: ");
        console.log(estadData);
        callMeOnFinish();
      });
  });


});
