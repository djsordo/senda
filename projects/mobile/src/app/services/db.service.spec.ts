import { TestBed } from "@angular/core/testing";

import { environment } from "../../environments/environment";
import { Db } from "./db.service";
import { initializeApp,
        provideFirebaseApp } from "@angular/fire/app";
import { getFirestore,
        provideFirestore,
        where } from "@angular/fire/firestore";

fdescribe('dbService', () => {

  let db : Db;

  beforeAll( (callMeOnFinish) => {
    // let app = initializeApp(environment.firebaseConfig); 
    // let firestore = getFirestore( app );
    
    // db = new Db( firestore );
    /* example with @angular/fire/firestore */
    TestBed.configureTestingModule({
      imports: [ 
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore( )) ]
    });
    
    db = TestBed.inject( Db );
    callMeOnFinish();
  });

  it('deporte query by subscription', (callMeOnFinish) => {
    db.deporteSub()
      .subscribe( (deporte) => {
        expect( deporte.length ).toBeGreaterThan( 0 );
        callMeOnFinish();
      });
  });

  it('add a new deporte', (callMeOnFinish) => {
    db.deporteAdd( { nombre : 'petanca' } )
      .then( () => callMeOnFinish() );
  });

  it('delete a deporte', (callMeOnFinish) => {
    db.deporteDel( "petanca" )
      .then( () => callMeOnFinish() );
  });

  it('simple clubs query by id', (callMeOnFinish) => {
    db.club( '9QXtOxWcsAxYfthcykId' )
      .then( club => {
        console.log( club );
        expect( true ).toBeTrue();
        callMeOnFinish();
      });
  });

  it('simple clubs query by filter', (callMeOnFinish) => {
    db.club( where( 'nombre', '==', 'Club Balonmano Melgar' ) )
      .then( clubs => {
        for( let club of clubs ){
          console.log( club );
        }
        expect( true ).toBeTrue();
        callMeOnFinish();
      });
  });

  it('equipo by categoria', (callMeOnFinish) => {
    db.equipo( where( "categoria", "==", "cadete" ) )
      .then( equipos => {
        for( let equipo of equipos ){
          console.log( "posible id del equipo: DESCONOCIDO" );
          console.log( equipo );
          expect( equipo ).toBeTruthy();
        }
        callMeOnFinish();
      });
  });

  it( 'get the equipos of a concrete club', (callMeOnFinish) => {
    db.club( where( 'nombre', '==', 'Club Balonmano Melgar' ) )
    .then( (clubArray) => {
      db.equipo( where( 'club.clubId', '==', clubArray[0].id ))
      .then( (equipoArray) => {
        console.log("equipo array");
        console.log( equipoArray );
        expect( equipoArray[0].id === "dr0KqB3l8bjm7guJ4Zya" ).toBeTrue();
        callMeOnFinish();
      });
    });
  });

  it('simple clubs query', (callMeOnFinish) => {
    db.club( '9QXtOxWcsAxYfthcykId' )
      .then( clubsArray => {
        console.log( clubsArray );
        expect(true).toBeTrue();
        callMeOnFinish();
      });
  });

  it('query club by name', (callMeOnFinish) => {
    db.club( where('nombre', "==", 'Club Balonmano Melgar') )
      .then( clubsArray => {
        console.log( clubsArray );
        expect( clubsArray[0].nombre === 'Club Balonmano Melgar' ).toBe( true );
        callMeOnFinish();
      });
  });

  it('equipo by name', (callMeOnFinish) => {
    db.equipo( where( "categoria", "==", "cadete" ) )
      .then( equipoArray => {
        console.log( equipoArray );
        expect( equipoArray.length ).toBeGreaterThan( 0 );
        callMeOnFinish();
      });
  });

});


