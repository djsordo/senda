/**
 * new_translations.js - for detect/update the translations files
 * 
 * 
 */
'use strict'; 

const path = require('path');
const fs = require('fs');
const xliff = require('xliff');
const { formatWithOptions } = require('util');

const projectDir = path.join( __dirname, '..' )


function deleteObsoleteTranslations( sourceUnits, destUnits ) {
  for( let destTrans in destUnits ){
    if( !(destTrans in sourceUnits) )
      delete destUnits[destTrans];
  }
  return destUnits;
}

function insertNewTranslations( sourceUnits, destUnits ){
  for( let sourceTrans in sourceUnits ){
    if( !(sourceTrans in destUnits ) ){
      // it is not a deep copy, I know
      destUnits[sourceTrans] = sourceUnits[sourceTrans];
      destUnits[sourceTrans].source = 'xx_o_xx ' + destUnits[sourceTrans].source;
    }
  }
  return destUnits;
}

function mergeTranslations( sourceTranslations, destTranslations ){
  let sourceUnits = sourceTranslations.resources.ngi18n;
  let destUnits = destTranslations.resources.ngi18n;
  destUnits = deleteObsoleteTranslations( sourceUnits, destUnits );
  destUnits = insertNewTranslations( sourceUnits, destUnits );
  return destTranslations;
}

function getOldFileName( filePath ){
  let dirStr = path.dirname( filePath );
  let fileStr = path.basename( filePath ).replace( ".xlf2", ".old.xlf2" );
  return path.join( dirStr, fileStr );
}

function createNewTranslation( sourceFile, 
                               translationFiles ) {
  let p = new Promise( (resolve, reject) => {
    xliff.xliff2js(fs.readFileSync( sourceFile, 'utf8' ), 
      (err, sourceTranslations) => {
      if( err )
        reject( err );
      // res is like js
      resolve( sourceTranslations );
    });
  }).then( (sourceTranslations) => {
    for( let translationFile of translationFiles ){
      console.log( `Processing ${translationFile}...` );
      xliff.xliff2js(fs.readFileSync( translationFile, 'utf8' ), 
      (err, destTranslations) => {
        destTranslations = mergeTranslations( sourceTranslations, destTranslations );
        // writeback the language with the translations
        fs.renameSync( translationFile, getOldFileName( translationFile ) );
        let resultFile = translationFile;
        xliff.js2xliff( destTranslations, (err, res) => {
          if( err ) throw Error( err ); 
          fs.writeFileSync( resultFile, res, 'utf8' );
        })
      });
    }
  });
}


function main( ){

  const sourceFile = path.join( projectDir, 'src/locale/messages.xlf2' );
  const translationFiles = [path.join( projectDir, 'src/locale/messages.en.xlf2' )];

  createNewTranslation( sourceFile, 
                        translationFiles );

}

main( ); 


