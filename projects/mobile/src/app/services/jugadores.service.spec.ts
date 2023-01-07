import { TestBed } from "@angular/core/testing";
import { initializeApp, 
         provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, 
         provideFirestore } from "@angular/fire/firestore";
import { Subscription } from "rxjs";


import { environment } from "../../environments/environment";
import { Jugador } from "../modelo/jugador";
import { JugadoresService } from "./jugadores.service";


describe('JugadoresService', () => {

  let jugadoresService : JugadoresService;

  beforeAll( (callMeOnFinish) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    jugadoresService = TestBed.inject( JugadoresService );
    callMeOnFinish();
  });

  it('should be created', () => { 
    expect( jugadoresService ).toBeTruthy();
  });

  it('consulta de jugadores de un equipo', (callMeOnFinish) => {
    let s = jugadoresService
          .getJugadoresEquipo( 'zJ95IqWhrfJs4AgdGS2i' )
          .subscribe( (jugadores : Jugador[] ) => {
            expect( jugadores.length ).toBeGreaterThan( 0 );
            for( let jugador of jugadores ){
              expect( jugador ).toBeTruthy();
              console.log( jugador );
            }
            s.unsubscribe();
            callMeOnFinish();      
          });
  });

});

