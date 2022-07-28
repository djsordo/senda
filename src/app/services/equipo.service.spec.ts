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

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()) ]
    });
    equipoService = TestBed.inject( EquipoService );
  });

  it('should be created', () => {
    expect( equipoService ).toBeTruthy();
  });

  it('probamos a consultar un equipo', ( endFunctionCall ) => {
    // comenzamos creando varios equipos
    Promise.all([
      equipoService.addEquipo( { nombre : 'rlunaro.sandia' } as Equipo ),
      equipoService.addEquipo( { nombre : 'rlunaro.melones' } as Equipo ),
      equipoService.addEquipo( { nombre : 'rlunaro.melocotones' } as Equipo )])
        .then( ([ ref1, ref2, ref3 ]) => {
          console.log('creados los tres documentos:');
          console.log( ref1 );
          console.log( ref2 );
          console.log( ref3 );
          equipoService.queryEquipos( 'rlunaro.sandia' )
            .then( (docList) => {
              console.log( 'value of docList:');
              console.log( docList );
              expect( docList ).toBeTrue();
              endFunctionCall();
              Promise.all([
                //equipoService.deleteEquipo( ref1 ),
                //equipoService.deleteEquipo( ref2 ),
                //equipoService.deleteEquipo( ref3 )
              ]);
            });
        });
  });

  it('guardamos un equipo', ()=>{
    let equipo = equipoService.newEquipo();
    equipo.nombre = 'raul.luna.equipo';
    equipoService.addEquipo( equipo )
      .then((value) =>  {
          console.log( 'al crear el equipo he recibido el valor: ' );
          console.log( value.id );
          equipoService.deleteEquipo( value )
            .then( (value) => {
              console.log( 'el borrado ha ido bien' );
              console.log( value );
            });
       } )
      .catch((value) => {
          console.log( 'esto es lo que se lanza cuando falla la creación del equipo', value );
      })
  });

  it('recuperamos todos los equipos', () => {
    let equipo = equipoService.newEquipo();
    equipoService.getAllEQuipo()
      .then((allElements) => {
        console.log(allElements[0]);
      })
      .catch((value) => {
        console.log("something have happened");
      });
  });

});


