import { TestBed } from "@angular/core/testing";
import { initializeApp, 
         provideFirebaseApp } from "@angular/fire/app";
import { DocumentData, getFirestore, 
         provideFirestore, 
         QuerySnapshot} from "@angular/fire/firestore";


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

  it('consulta de jugadores como promesa', (callMeOnFinish) => {
    console.log( "entro en el test, pero no pasa nada" );
    jugadoresService.getJugadoresEquipoAsDoc( 'zJ95IqWhrfJs4AgdGS2i' )
      .then( ( val : QuerySnapshot<DocumentData> ) => {
          let result = [];
          for( let doc of val.docs ){
            result.push( doc.data() );
          }
          expect( result.length ).toBeGreaterThanOrEqual( 0 );
          callMeOnFinish();
      });
  });

});

