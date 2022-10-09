/**
 * deploy_apk.js - for deploy the apk
 */
'use strict'; 

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

const CONFIG = path.join( __dirname, "..", "PRIVATE", "config.json" );


let msg1 = `
----------------------------------
Lo primero que tenemos que hacer es 
subir el número de version en el fichero 
environments.prod.ts.

Pulsa <intro> cuando hayas terminado: `;

let msg2 = `
------------------------------------
Ahora tienes que ir al android Studio y 
compilar la solución, y generar un fichero *.apk. 

Pulsa <intro> cuando hayas terminado`;

function main(){

  const config_all = JSON.parse( fs.readFileSync( CONFIG ) );
  const config = config_all['deploy_apk.js'];
  const rl = readline.createInterface({
    input : process.stdin, 
    output : process.stdout
  });

  rl.question( msg1, (value) => { 
          runCommand( config["capacitor_sync"] )
            .then( (val) => {
              rl.question( msg2, 
                (value) => {
                  moveFile( config["move_rename"]["from"],
                            config["move_rename"]["to"] )
                    .then( (value) => {
                      runCommand( config["deploy_apk"] )
                      .then( () => {
                        rl.close();
                      })
                    })
                    .catch( (error) => {
                      console.error("se ha producido un error:");
                      console.error( error );
                      rl.close();
                    } );
                });
            });
        } );

}


async function runCommand( cmd ){
  let cmdHandler = spawn( cmd[0], cmd.slice(1) );
  cmdHandler.stdout.on( 'data', (data) => process.stdout.write(data) );
  cmdHandler.stderr.on( 'data', (data) => process.stderr.write(data) );
  return new Promise( (resolve, reject) => {
    cmdHandler.on('exit', (code) =>  resolve( code ) );
    cmdHandler.on('error', (errorCode) => reject(errorCode) );
  });
}


async function moveFile( sourcePath, destPath ){

  let is = fs.createReadStream(sourcePath);
  let os = fs.createWriteStream(destPath);

  return new Promise( (resolve, reject) => {
    is.pipe(os);
    is.on('end', () => {
      is.close();
      fs.unlinkSync(sourcePath);
      os.close();
      resolve( "file_copied" );
    });
    is.on('error', () => {
      is.close();
      os.close();
      reject( "file not found" );
    })
  });

}

main(); 

