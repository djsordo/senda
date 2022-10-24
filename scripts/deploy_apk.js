/**
 * deploy_apk.js - for deploy the apk
 * 
 * 
 */
'use strict'; 

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

const CONFIG = path.join( __dirname, "..", "PRIVATE", "config.json" );


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

  console.log( 'Subiendo código de versión....' );
  setCodeVersionGradle( config.environment_prod, config.build_gradle );

  console.log( 'Ejecutamos ', config["capacitor_sync"] );
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
          });
      });
  });

}


async function runCommand( cmd ){
  console.log( cmd.reduce( (prev, current) => { return prev + ' ' + current;}, '' ) );
  let cmdHandler = spawn( cmd[0], cmd.slice(1), { shell : true } );
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


function setCodeVersionGradle( envPath, filePath ){

  const backupFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '~' );
  const tempFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.tmp' );

  const rl = readline.createInterface( {
    input : fs.createReadStream( filePath ), 
    crlfDelay: Infinity
  });
  let writeStream = fs.createWriteStream( tempFilePath );
  rl.on('line', (line) => {
    writeStream.write( incrementCodeVersionGradle( path.basename( filePath ), line ) + '\n' );
  });
  rl.on('close', () => {
    writeStream.close();
    fs.renameSync( filePath, backupFilePath );
    fs.renameSync( tempFilePath, filePath );
  });

}

function incrementCodeVersionGradle( filename, line ){
  const versionRegexp = /(\s*versionCode\s*)([0-9]+)\s*/;
  let matching =  line.match( versionRegexp );
  if( matching ){
    let newCodeVersion = parseInt( matching[2] );
    let versionLineUpdated = `${matching[1]}${newCodeVersion+1}`;
    console.log( `Codigo de version pasa de ${newCodeVersion} a ${newCodeVersion+1} en ${filename}` );
    return versionLineUpdated;
  }else{
    return line;
  }

}



main(); 



