/**
 * increment_version.js - for deploy the apk
 * 
 * 
 */
'use strict'; 

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

const CONFIG = path.join( __dirname, "..", "PRIVATE", "config.json" );


function main(){

  const config_all = JSON.parse( fs.readFileSync( CONFIG ) );
  const config = config_all['deploy_apk.js'];

  console.log( 'Subiendo código de versión....' );
  incrementVersionMinor( config.environment_prod );
  setVersionGradle( config.environment_prod, config.build_gradle );

}



function incrementVersionMinor( filePath ){
  const versionRegexp = /(\s*version\s*:\s*['"][0-9]+\.[0-9]+\.)([0-9]+)(['"],?)/;
  
  const backupFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '~' );
  const tempFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.tmp' );
  
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
      console.log( `${path.basename( filePath )} pasa de ${line} a ${versionLineUpdated}` );
      writeStream.write( versionLineUpdated + '\n' );
    }else{
      writeStream.write( line +'\n' );
    }
  });
  rl.on('close', () => {
    writeStream.close();
    fs.renameSync( filePath, backupFilePath );
    fs.renameSync( tempFilePath, filePath );
  });
}


async function getVersionToReplace( envPath ){
  const versionRegexp = /\s*version\s*:\s*['"]([0-9]+\.[0-9]+\.[0-9]+)['"],?/;
  return new Promise( (resolve) => {
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
        writeStream.write( replaceVersionNumberGradle(
                                  path.basename( envPath ), 
                                  line, 
                                  currentVersionNumber ) + '\n' );
        ;
      });
      rl.on('close', () => {
        writeStream.close();
        fs.renameSync( filePath, backupFilePath );
        fs.renameSync( tempFilePath, filePath );
      });
    });
}

function replaceVersionNumberGradle( fileToReport, line, currentVersionNumber ) {
  const versionRegexp = /(\s*versionName\s*['"])([0-9]+\.[0-9]+\.[0-9]+)(['"])\s*/;
  let matching =  line.match( versionRegexp );
  if( matching ){
    let versionLineUpdated = `${matching[1]}${currentVersionNumber}${matching[3]}`;
    console.log( `${fileToReport} pasa de ${line} a ${versionLineUpdated}` );
    return versionLineUpdated;
  }else{
    return line;
  }
}

main(); 



