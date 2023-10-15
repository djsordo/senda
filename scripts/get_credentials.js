/**
 * 
 * Taken from: https://gist.github.com/Alhamou/10d5dcfc338c4e5a33485029b6d23b9d
 * 
 */
'use strict';

const fs = require('fs');
const path = require('path');


const CREDENTIALS_PATH = path.join( __dirname, "..", "PRIVATE", "credentials.json" );

function getCredentials( callback, args ){
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    let credentials = JSON.parse(content);
    callback( credentials, args );
  });  
}



function helpMessage(){
  console.log( `Please call with node ${path.basename( process.argv[1] )} [client_id|client_secret]` );
}


/**
 * main program 
 */
if( process.argv.length !== 3 ){
  helpMessage();
}else{
  getCredentials( ( credentials, keyName ) => {
    console.log( credentials.installed[keyName] );
  }, 
  process.argv[2] );

}



