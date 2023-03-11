import { TestBed } from "@angular/core/testing";
import { initializeApp, 
        provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, 
        provideFirestore,
        where} from "@angular/fire/firestore";

import { environment } from "../../environments/environment";
import { Db } from "./db.service";

fdescribe('dbService', () => {

  let db : Db;

  beforeAll( (callMeOnFinish) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    db = TestBed.inject( Db );
    callMeOnFinish();
  });

  it('simple clubs query', (callMeOnFinish) => {
    db.club( ['id', "==", '9QXtOxWcsAxYfthcykId'] ).get()
      .subscribe( clubsArray => {
        console.log( clubsArray );
        expect(true).toBeTrue();
        callMeOnFinish();
      });
  });

  it('query by name', (callMeOnFinish) => {
    db.club( ['nombre', "==", 'Club Balonmano Melgar'] ).get()
      .subscribe( clubsArray => {
        console.log( clubsArray );
        expect( clubsArray[0].nombre === 'Club Balonmano Melgar' ).toBe( true );
        callMeOnFinish();
      });
  });

  it('equipo by name', (callMeOnFinish) => {
    db.equipo( ["categoria", "==", "cadete"] ).get()
      .subscribe( equipoArray => {
        console.log( equipoArray );
        expect( equipoArray.length ).toBeGreaterThan( 0 );
        callMeOnFinish();
      });
  });

  it('equipo sub-query of club', (callMeOnFinish) => {
    db.club( ['id', "==", '9QXtOxWcsAxYfthcykId'] )
      .equipo()
      .get()
      .subscribe( equipoArray => {
        console.log( "RESULTADO DE LA SUBCONSULTA DE LA SUBCONSULTA" );
        console.log( equipoArray );
        callMeOnFinish();
      });
  });

  
});


