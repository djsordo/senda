
import { initializeApp } from "firebase/app";
import { getFirestore, 
        query,
        collection } from 'firebase/firestore';
import { environment } from './environment';
const readline = require('readline');


class Option{
  value : number;
  name : string;
  action : () => void; 
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore( app );
const partidoRef = query( collection( firestore, 'partidos' ));

console.log( partidoRef );

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
  while( !wantsToExit ){
    await showMenuWaitForAnswer( title, options )
      .then( (answer) => {
                          if( answer.value === 0 ){
                            wantsToExit = true;
                          }else{
                            answer.action();
                          }
                        } )
      .catch( (answer) => { 
                        console.log( `Opción incorrecta (${answer})` );
                        console.log( "" );} );
  }
}


async function menuPrincipal(){
  await menu( 'Menu Principal', 
                    [{value: 1, name: 'Equipos', action: menuEquipos },
                    {value: 2, name: 'Partidos', action: doNothing },
                    {value: 3, name: 'Usuarios', action: doNothing },
                    {value: 0, name: 'Salir', action: doNothing }] );
}


async function menuEquipos(){
  await menu( 'Equipos', 
              [ {value: 1, name: 'Alta equipo', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }])
}

const main = async () => {

  await menuPrincipal();
  rl.close();
}

main();


