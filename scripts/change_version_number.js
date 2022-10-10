
'use strict'; 

const fs = require('fs');
const readline = require('readline');
const path = require('path');

//   version: "1.1.5", 
function incrementVersionMinor( filePath ){
  const versionRegexp = /(\s*version\s*:\s*['"][0-9]+\.[0-9]+\.)([0-9]+)(['"],?)/;
  console.log( path.dirname( filePath ) );
  console.log( path.basename( filePath ) );
  console.log( path.extname( filePath ) );
  
  const backupFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.bak' );
  const tempFilePath = path.join( path.dirname( filePath ), path.basename( filePath ) + '.tmp' );
  console.log( backupFilePath ); 
  console.log( tempFilePath );
  const rl = readline.createInterface( {
    input : fs.createReadStream( filePath ), 
    crlfDelay: Infinity
  });
  let writeStream = fs.createWriteStream( tempFilePath );
  rl.on('line', (line) => {
    let matching =  line.match( versionRegexp);
    if( matching ){
      let minorNumber = parseInt( matching[2] );
      let versionLineUpdated = `${matching[1]}${minorNumber+1}${matching[3]}`;
      console.log( line );
      console.log( matching );
      console.log( versionLineUpdated );
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

incrementVersionMinor( 'C:\\wkjs\\senda\\scripts\\environment.ts' );


