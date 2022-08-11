

/**
 * Utilidades para cadenas de caracteres, por ejemplo un comparador 
 * por contenido que ignore mayúsculas y minúsculas. 
 */
export class StringUtil{

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
  public like( str : string, pattern: string ){
    return false;
  }
}