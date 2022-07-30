import { TestBed } from "@angular/core/testing";
import { provideFirestore, 
        getFirestore } from "@angular/fire/firestore";
import { initializeApp, 
        provideFirebaseApp } from '@angular/fire/app';

import { environment } from './../../environments/environment';
import { EquipoService } from "./equipo.service";
import { Equipo } from "../modelo/equipo";


fdescribe( 'EquipoService', () => {

  let equipoService : EquipoService;

  beforeAll( ( callMeOnFinish ) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    equipoService = TestBed.inject( EquipoService );
    // 
    // creación de entorno de pruebas 
    // 
    Promise.all([
      equipoService.addEquipo( { nombre : 'rlunaro.sandia' } as Equipo ),
      equipoService.addEquipo( { nombre : 'rlunaro.melones' } as Equipo ),
      equipoService.addEquipo( { nombre : 'rlunaro.melocotones' } as Equipo )])
        .then( ([ ref1, ref2, ref3 ]) => {
          console.log('creados los tres documentos:');
          console.log( ref1.id );
          console.log( ref2.id );
          console.log( ref3.id );
        })
        .then( () => { 
          console.log('ultima llamada antes de dar por finalizado el beforeAll');
          callMeOnFinish(); });
  });

  afterAll( ( callMeOnFinish ) => {
    Promise.all([
      equipoService.deleteEquipoByName( 'rlunaro.sandia' ), 
      equipoService.deleteEquipoByName( 'rlunaro.melones' ), 
      equipoService.deleteEquipoByName( 'rlunaro.melocotones' ), 
      equipoService.deleteEquipoByName( 'raul.luna.equipo' ) ])
      .then( () => { callMeOnFinish(); });
  });

  it('should be created', () => {
    expect( equipoService ).toBeTruthy();
  });

  it('consulta de un equipo', ( endFunctionCall ) => {
    equipoService.getEquipoByName( 'rlunaro.sandia' )
      .then( (docList) => {
        docList.forEach( doc => {
          console.log( "resultado de la query:");
          console.log( doc.data() );
          expect( doc.data().nombre == 'rlunaro.sandia' ).toBeTrue();
        });
        endFunctionCall();
      });
  });

  it('guardamos un equipo', ( callMeOnFinish )=>{
    let equipo = equipoService.newEquipo();
    equipo.nombre = 'raul.luna.equipo';
    equipoService.addEquipo( equipo )
      .then((equipoRef) =>  {
          let check = equipoService.getEquipoByName( 'raul.luna.equipo' );
          console.log("que es equipo ref");
          equipoService.getEquipoByRef( equipoRef )
            .then( value => {
              expect( value ).toBeTruthy();
              expect( value.data ).toBeTruthy();
              expect( value.data().nombre == 'raul.luna.equipo' ).toBeTrue();
              check.then( checkRef => {
                    /* AQUI ME QUEDO: getEquipoByName y getEquipoByRef no 
                    devuelven los mismos valores: el uno devuelve una
                    referencia a un documento, el otro devuelve 
                    ¿una referencia a una colección de documentos??? 
                    Tengo que plantearme qué es lo que realmente necesito
                    en el API antes de seguir con el test, ya que no 
                    acierto con el diseño del API que quiero */
                    console.log( "ahora vamos con el check" );
                    console.log( checkRef );
                    callMeOnFinish();
                   });
            } );
       } )
      .catch((value) => {
          console.log( 'esto es lo que se lanza cuando falla la creación del equipo', value );
      })
  });

  it('recuperamos todos los equipos', ( callMeOnFinish ) => {
    let equipo = equipoService.newEquipo();
    equipoService.getAllEQuipo()
      .then((allElements) => {
        let numEquipos = 0;
        allElements.forEach( elem => {
          numEquipos++;
        })
        expect( numEquipos > 0 ).toBeTrue(); 
        callMeOnFinish();
      })
      .catch((value) => {
        console.error( "error on test", value );
      });
  });

});


