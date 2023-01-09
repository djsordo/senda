import { TestBed } from "@angular/core/testing";
import { provideFirestore, 
         getFirestore } from "@angular/fire/firestore";
import { initializeApp, 
          provideFirebaseApp } from '@angular/fire/app';



import { DeportesService } from "./deportes.service"
import { environment } from 'projects/mobile/src/environments/environment';



describe( 'DeportesService', () => {

  let deportesService : DeportesService;

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
      deportesService = TestBed.inject( DeportesService );
      callMeOnFinish();
    });


    it( 'debe tener datos', ( callMeOnFinish ) => {
      deportesService.getDeportes()
        .then( (deportesList) => {
          expect( deportesList.docs.length > 0 ).toBeTrue();
          callMeOnFinish();
        });
    });

    it( 'get document by id', (callMeOnFinish) => {
      deportesService.getDocById( 'oUiMQvAbz7PSimSqpScF' )
        .then( (docSnap) =>{
          console.log( docSnap.data() );
          expect( docSnap ).toBeTruthy();
          callMeOnFinish();
        });
    });

})