/**
 * 
 * 
 */

import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';


function readConfig(){
  const config_path = path.join( import.meta.dirname, "..", "private", "config.yaml" );

  const config = yaml.parse( fs.readFileSync(config_path, 'utf8') );

  config.project_home = path.normalize( path.join( config_path, '..', '..' ) );

  return config; 
}

function getCredentials( callback, args ){
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    let credentials = JSON.parse(content);
    callback( credentials, args );
  });  
}



function helpMessage(){
  console.log( "Helper script to read values from the config.yaml configuration file")
  console.log( "Please call with node get_config.mjs [config_value]" );
  console.log( "" );
  console.log( "Example of invocation: get_config.mjs upload_secrets.installed.client_id" );
  console.log( "" );
  console.log( "If the element is an array, you can get the different elements by:" );
  console.log( "projects/batch/get_config.mjs upload_secrets.secrets.0" );
}


/**
 * main program 
 */
if( process.argv.length !== 3 ){
  helpMessage();
}else{
  /*
  Example of invocation: get_config.mjs upload_secrets.installed.client_id
  */
  const config = readConfig();
  let nodeNameList = process.argv[2].split('.');
  let element = config;
  for( let nodeName of nodeNameList ){
    element = element[nodeName];
  }
  console.log( element );
  // getCredentials( ( credentials, keyName ) => {
  //   console.log( credentials.installed[keyName] );
  // }, 
  // process.argv[2] );

}



