/**
 * deploy_web.js - for deploy the web hosting
 * 
 * 
 */
'use strict'; 

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn, spawnSync } = require('child_process');
const { config } = require('process');

const CONFIG = path.join( __dirname, "..", "PRIVATE", "config.json" );



function main( args ){

  const config = JSON.parse( fs.readFileSync( CONFIG ) );

  if( args[0] !== 'desa' && args[0] !== 'prod' && args[0] != 'produccion' ){
    console.log( "debe indicarse desa o producción" );
    return;
  }

  runCommand( ['firebase', 'login:use', config['gmail_account']] )
  .then( (_) => {
    if( args[0] === 'desa' ){
      console.log("Building and deploying for development");
      runCommand( ['ionic', 'build'] )
      .then( (_) => {
        runCommand( ['firebase', 'deploy', '--project', config['dev_project'], '--only', `hosting:${config['dev_hosting']}` ] );
      });
    }else{
      console.log("Building and deploying for PRODUCTION");
      runCommand( ['ionic', 'build', '--configuration=production'] )
      .then((_) => {
        runCommand( ['firebase', 'deploy', '--project', config['prod_project'], '--only', `hosting:${config['prod_hosting']}`] );
      });
    }  
  } )


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


main( process.argv.slice(2) ); 


