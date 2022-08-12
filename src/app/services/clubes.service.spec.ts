import { TestBed } from '@angular/core/testing';
import { provideFirestore, 
        getFirestore } from "@angular/fire/firestore";
import { initializeApp, 
        provideFirebaseApp } from '@angular/fire/app';

import { environment } from './../../environments/environment';
import { ClubesService } from './clubes.service';


describe( 'ClubesService', () => {

  let clubesService : ClubesService;

  /**
   * function to be executed before all the tests (only once per all the tests)
   */
  beforeAll( ( callMeOnFinish ) => {

    /**
     * ejemplo usando la libreria 'firebase/firestore'
     * 
     * TestBed.configureTestingModule({});
     * clubesService = new ClubesService( initializeFirestore( 
     *   initializeApp( environment.firebaseConfig ),
     *   {
     *     cacheSizeBytes : 40000000
     *   } as FirestoreSettings ) );
     */

    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    clubesService = TestBed.inject( ClubesService );
    Promise.all([
      clubesService.addClub('rlunaro.club2', 'Balonmano'),
      clubesService.addClub('rlunaro.club3', 'Balonmano'),
      clubesService.addClub('rlunaro.club4', 'Balonmano')
    ]).then( () => { callMeOnFinish(); } );
  });

  /**
   * function to be executed after all the tests (only once per all the tests)
   */
  afterAll( ( callMeOnFinish ) => {
    Promise.all([
      clubesService.deleteClubByName('rlunaro.club2'),
      clubesService.deleteClubByName('rlunaro.club3'),
      clubesService.deleteClubByName('rlunaro.club4')
    ]).then( () => { callMeOnFinish(); } );
  });

  /**
   * this will be executed before each test
   */
  beforeEach( () => {

  });

  /**
   * this will be executed after each test 
   */
  afterEach( () => { 

  });

  it( 'creacion simple del servicio', () =>  {
    expect( clubesService ).toBeTruthy();
  });

  it( 'añadir y borrar un club', ( callMeOnFinish ) => {
    clubesService.addClub( 'rlunaro.club1', 'rlunaro.deporte1' )
      .then( (docRef) => {
        expect( docRef ).toBeTruthy();
        expect( docRef.id ).toBeTruthy();
        clubesService.deleteClubByRef( docRef )
          .then( () => {
            callMeOnFinish();
          });
      })
      .catch( () => {
        console.error( 'error on call to añadir un club');
        callMeOnFinish();
      });
  });

  it( 'conseguir la lista de clubes', ( callMeOnFinish ) => {
    clubesService.getClubes()
      .then( (clubList) => {
        console.log( clubList );
        // ejemplo de recorrer la lista como un array
        for( let docSnap of clubList.docs ){
          console.log( docSnap.data() );
          expect( docSnap.data() ).toBeTruthy();
        }
        // ejemplo de recorrer la lista con un forEach()
        clubList.forEach( (docSnap) => {
          console.log( docSnap.data() );
          expect( docSnap.data() ).toBeTruthy();
        });
        callMeOnFinish();
      });
  });

});

