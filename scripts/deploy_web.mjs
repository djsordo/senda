/**
 * deploy_web.mjs - for deploy the web hosting
 * 
 * 
 */
import * as fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import yaml from 'yaml';


function readConfig(){
  const config_path = path.join( import.meta.dirname, "..", "private", "config.yaml" );

  const config = yaml.parse( fs.readFileSync(config_path, 'utf8') );

  config.project_home = path.normalize( path.join( config_path, '..', '..' ) );

  return config; 
}

function main( config, args ){

  if( args[0] !== 'desa' 
    && args[0] !== 'pre'
    && args[0] !== 'prod' 
    && args[0] != 'produccion' 
    && args[0] !== 'serve_desa' 
    && args[0] !== 'serve_prod' ){
    console.log( "debe indicarse uno de estos valores:" );
    console.log( "deploy_web.js desa -> genera el sitio web de desarrollo y lo sube a la nube de google (firebase hosting)");
    console.log( "deploy_web.js pre  -> genera el sitio web de preproduccion (es PRO pero en otro dominio)");
    console.log( "deploy_web.js prod -> genera el sitio web de produccion y lo sube a la nube de google (firebase hosting)");
    console.log( "deploy_web.js serve_desa -> sirve localmente el sitio web de desarrollo");
    console.log( "deploy_web.js serve_prod -> sirve localmente el sitio web de produccion");

    return;
  }

  runCommand( ['firebase', 'login:use', config.gmail_account] )
  .then( (_) => {
    if( args[0] === 'desa' ){
      console.log("Building and deploying for development");
      runCommand( ['ionic', 'build', '--configuration=development', '--project=mobile'] )
      .then( (_) => {
        runCommand( ['firebase', 'deploy', '--project', config.desa.project, '--only', `hosting:${config.desa.hosting}` ] );
      });
    }else if( args[0] === 'pre' ){
      console.log("Building and deploying for PREproduction");
      runCommand( ['ionic', 'build', '--configuration=production', '--project=mobile'] )
      .then((_) => {
        runCommand( ['firebase', 'deploy', '--project', config.pre.project, '--only', `hosting:${config.pre.hosting}`] );
      });
    }else if( args[0] === 'prod' ){
      console.log("Building and deploying for PRODUCTION");
      runCommand( ['ionic', 'build', '--configuration=production'] )
      .then((_) => {
        runCommand( ['firebase', 'deploy', '--project', config.prod.project, '--only', `hosting:${config.prod.hosting}`] );
      });
    }else if( args[0] === 'serve_desa' ){
      console.log("Serving locally development");
      runCommand( ['ionic', 'build', '--project=mobile', '--configuration=development'] )
      .then( (_) => {
        runCommand( ['firebase', 'serve', '--project', config.desa.project, '--only', `hosting:${config.desa.hosting}` ] );
      });
    }else /* serve_prod */ {
      console.log("Serving locally production");
      runCommand( ['ionic', 'build', '--project=mobile', '--configuration=production'] )
      .then((_) => {
        runCommand( ['firebase', 'serve', '--project', config.prod.project, '--only', `hosting:${config.prod.hosting}`] );
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


main( readConfig(), process.argv.slice(2) ); 


