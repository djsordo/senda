
import { initializeApp } from "firebase/app";
import { getFirestore, 
        query,
        collection } from 'firebase/firestore';
import * as readline from 'readline';


import { environment } from '../environments/environment';
//import { EquipoService } from '../app/services/equipo.service';

class Option{
  value : number;
  name : string;
  action : () => void; 
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore( app );
//let equipoService = new EquipoService( firestore );

//const partidoRef = query( collection( firestore, 'partidos' ));

//console.log( partidoRef );

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function doNothing(){
  console.log('en construccion');
}

function showMenu( title : string, 
                      options : Option[] ) {
  console.log( title );
  console.log( '' );
  for( let option of options ) {
    console.log( `${option.value} - ${option.name}`)
  }
  console.log( '' );
}

async function showMenuWaitForAnswer( title : string, 
                      options : Option[] ) {
  return new Promise( (resolve : ( val : Option ) => void,
                       reject : ( val : string ) => void ) => {
        showMenu( title, options );
        rl.question( 'Selección> ', (answer : string) =>
          {
            let selectedOption = options.find( (val) => val.value === parseInt(answer) );
            if( selectedOption )
              resolve( selectedOption );
            else
              reject( answer );
          });
    });
}

async function menu( title: string, 
            options : Option[] ) {
  let wantsToExit = false;
  let selectedOption = null;
  while( selectedOption === null ){
    await showMenuWaitForAnswer( title, options )
      .then( (answer) => {
                          selectedOption = answer;
                        } )
      .catch( (answer) => { 
                        console.log( `Opción incorrecta (${answer})` );
                        console.log( "" );} );
  }
  return selectedOption;
}


async function menuPrincipal(){
  return menu( 'Menu Principal', 
                    [{value: 1, name: 'Equipos', action: menuEquipos },
                    {value: 2, name: 'Partidos', action: doNothing },
                    {value: 3, name: 'Usuarios', action: doNothing },
                    {value: 0, name: 'Salir', action: doNothing }] );
}


async function menuEquipos(){
  return menu( 'Equipos', 
              [ {value: 1, name: 'Alta equipo', action: doNothing },
                {value: 2, name: 'Baja equipo', action: doNothing },
                {value: 3, name: 'Modificar equipo', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }])
}

const main = async () => {

  //let option1 = await menuPrincipal();
  //let option2 = await option1.action();
  await menuEquipos();
  rl.close();
}

main();


