import { Injectable } from "@angular/core";


/**
 * Utilidades para cadenas de caracteres, por ejemplo un comparador 
 * por contenido que ignore mayúsculas y minúsculas. 
 */
@Injectable({
  providedIn : 'root'
})
export class StringUtil{

  subtitutions = {
    'a' : 'áàäã',
    'e' : 'éèë',
    'i' : 'íìï',
    'o' : 'óòö',
    'u' : 'úùü'
  };

  /**
   * Comparación flexible: 
   * 
   * <code>like( 'hola    lucas', 'hola' ) -> true</code> (busca por contenido)
   * <code>like( 'hola    lucas', 'hola lucas' ) -> true</code> (ignora espacios repetidos)
   * <code>like( 'HOLA  LUCAS', 'hola lucas' ) -> true</code> (ignora mayusculas y minúsculas)
   * <code>like( 'hóla lúcas', 'hola lucas' ) -> true</code> (ignora marcas diacríticas)
   * @param str 
   * @param pattern 
   */
  public like( pajar : string, aguja : string ){

    pajar = pajar.toLowerCase(); 
    aguja = aguja.toLowerCase();

    const anyWhiteSpace = /\s+/ig;
    aguja = aguja.replaceAll( anyWhiteSpace, ' ' );
    aguja = this.replaceDiacritics( aguja );
    pajar = pajar.replaceAll( anyWhiteSpace, ' ' );
    pajar = this.replaceDiacritics( pajar );


    if( pajar.search( aguja ) >= 0 )
      return true; 
    else
      return false;
  }

  private replaceDiacritics( str : string ){
    for( let character in this.subtitutions ){
      const charactersToReplace = this.subtitutions[ character ];
      for( let characterToLocate of charactersToReplace ){
        str = str.replaceAll( characterToLocate, character );
      }
    }
    return str; 
  }

}

export function make_id( ...values : string[] ){

  let replacements = [{regexp : /[áàäâ]/g, replacement : 'a'},
                      {regexp : /[éèëê]/g, replacement : 'e'},
                      {regexp : /[íìïî]/g, replacement : 'i'},
                      {regexp : /[óòöô]/g, replacement : 'o'},
                      {regexp : /[úùüû]/g, replacement : 'u'},
                      {regexp : /ñ/g     , replacement : 'n'},
                      {regexp : /_el_/g,     replacement : '_'},
                      {regexp : /_la_/g,     replacement : '_'},
                      {regexp : /_los_/g,    replacement : '_'},
                      {regexp : /_las_/g,    replacement : '_'},
                      {regexp : /_un_/g,     replacement : '_'},
                      {regexp : /_una_/g,    replacement : '_'},
                      {regexp : /_unos_/g,   replacement : '_'},
                      {regexp : /_unas_/g,   replacement : '_'},
                      {regexp : /_the_/g,    replacement : '_'},
                      {regexp : /_and_/g,    replacement : '_'},
                      {regexp : /[%&\/\\¿?¡!]/g, replacement : '_' }];

  let s = '';
  for( let val of values ){
    s += ' ' + val;
  }

  s = s.trim().toLowerCase();
  s = s.replaceAll( /\s+/g, '_' );
  for( let repl of replacements ){
    s = s.replaceAll( repl.regexp, repl.replacement );
  }
  s = s.replaceAll( /[^\w]/g, '_' );
  s = s.replaceAll( /_+/g, '_' );
  s = s.replace( /^_/, '' );
  s = s.replace( /_$/, '' );
  return s;
}

/**
 * Given an imput string, return it in "Proper Case", i.e. 
 * the first letter in uppercase and the rest in lowercase.
 * 
 * @param s input string
 */
export function properCase( s : string ){
  return s[0].toUpperCase() + s.slice( 1 ).toLowerCase();
}

/**
 * Given a Date object, returns a string representing 
 * a "useful" translation of that date. 
 * 
 * A useful representation is "two days ago" instead of 
 * "18/08/2022" or "In two hours" to represent that the 
 * event represented by this date will begin on two hours.
 * 
 * @param d 
 */
export function formatDateUtil( d : Date ){
  const now = new Date();

  let dateDiff = now.getTime() - d.getTime();
  console.log( dateDiff );
}







