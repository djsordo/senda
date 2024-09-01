/**
 * increment_version.js - the version number must be set in various files, so this script helps to keep version numbers aligned
 * 
 * 
 */
import * as fs from 'node:fs';
import path from 'node:path';
import readline from 'readline';
import yaml from 'yaml';

function readConfig(){
  const config_path = path.join( import.meta.dirname, "..", "private", "config.yaml" );

  const config = yaml.parse( fs.readFileSync(config_path, 'utf8') );

  config.project_home = path.normalize( path.join( config_path, '..', '..' ) );

  return config; 
}

function main( config ){

  console.log( 'Subiendo código de versión....' );
  let environment_prod = path.join( config.project_home, config.environment_prod );
  let build_gradle = path.join( config.project_home, config.build_gradle );
  incrementVersionMinor( environment_prod );
  setVersionGradle( environment_prod, build_gradle );

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

main( readConfig() ); 



