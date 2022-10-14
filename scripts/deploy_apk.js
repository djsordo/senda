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
  incrementVersionMinor( config.environment_prod );
  setVersionGradle( config.environment_prod, 'build.gradle' );

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


function incrementVersionMinor( filePath ){
  const versionRegexp = /(\s*version\s*:\s*['"][0-9]+\.[0-9]+\.)([0-9]+)(['"],?)/;
  console.log( path.dirname( filePath ) );
  console.log( path.basename( filePath ) );
  console.log( path.extname( filePath ) );
  
  const backupFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '~' );
  const tempFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.tmp' );
  console.log( backupFilePath ); 
  console.log( tempFilePath );
  const rl = readline.createInterface( {
    input : fs.createReadStream( filePath ), 
    crlfDelay: Infinity
  });
  let writeStream = fs.createWriteStream( tempFilePath );
  rl.on('line', (line) => {
    let matching =  line.match( versionRegexp );
    if( matching ){
      let minorNumber = parseInt( matching[2] );
      let versionLineUpdated = `${matching[1]}${minorNumber+1}${matching[3]}`;
      console.log( `Subimos version de ${line} a ${versionLineUpdated}` );
      writeStream.write( versionLineUpdated + '\n' );
    }else{
      writeStream.write( line +'\n' );
    }
  });
  rl.on('close', () => {
    console.log( 'closing the output stream' );
    writeStream.close();
    fs.renameSync( filePath, backupFilePath );
    fs.renameSync( tempFilePath, filePath );
  });
}


async function getVersionToReplace( envPath ){
  const versionRegexp = /\s*version\s*:\s*['"]([0-9]+\.[0-9]+\.[0-9]+)['"],?/;
  return new Promise( (resolve, reject) => {
    const rl = readline.createInterface( {
      input : fs.createReadStream( envPath ), 
      crlfDelay: Infinity
    });
    rl.on('line', (line) => {
      let matching =  line.match( versionRegexp );
      if( matching ){
        resolve( matching[1] );
      }
    });
  });
  
}

function setVersionGradle( envPath, filePath ){

  const backupFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '~' );
  const tempFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.tmp' );

  getVersionToReplace( envPath )
    .then( (currentVersionNumber) => {
      const rl = readline.createInterface( {
        input : fs.createReadStream( filePath ), 
        crlfDelay: Infinity
      });
      let writeStream = fs.createWriteStream( tempFilePath );
      rl.on('line', (line) => {
        writeStream.write( replaceVersionNumberGradle( replaceCodeGradle( line ), currentVersionNumber ) + '\n' );
      });
      rl.on('close', () => {
        console.log( 'closing the output stream' );
        writeStream.close();
        // xjx fs.renameSync( filePath, backupFilePath );
        // xjx fs.renameSync( tempFilePath, filePath );
      });
    });
}

function replaceVersionNumberGradle( line, currentVersionNumber ) {
  const versionRegexp = /(\s*versionName\s*['"])([0-9]+\.[0-9]+\.[0-9]+)(['"])\s*/;
  let matching =  line.match( versionRegexp );
  if( matching ){
    let versionLineUpdated = `${matching[1]}${currentVersionNumber}${matching[3]}`;
    console.log( `Subimos version de ${line} a ${versionLineUpdated}` );
    return versionLineUpdated;
  }else{
    return line;
  }
}

function replaceCodeGradle( line ){
  const versionRegexp = /(\s*versionCode\s*)([0-9]+)\s*/;
  let matching =  line.match( versionRegexp );
  if( matching ){
    let newCodeVersion = parseInt( matching[2] );
    let versionLineUpdated = `${matching[1]}${newCodeVersion+1}`;
    console.log( `Subimos version de ${newCodeVersion} a ${newCodeVersion+1}` );
    return versionLineUpdated;
  }else{
    return line;
  }

}



main(); 



