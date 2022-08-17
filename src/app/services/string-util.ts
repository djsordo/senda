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



/**
 * Given an imput string, return it in "Proper Case", i.e. 
 * the first letter in uppercase and the rest in lowercase.
 * 
 * @param s input string
 */
export function properCase( s : string ){
  return s[0].toUpperCase() + s.slice( 1 ).toLowerCase();
}




