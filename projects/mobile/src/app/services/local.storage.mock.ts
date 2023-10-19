import { Injectable } from "@angular/core";
import { LocalStorageProvider } from "./local.storage.service";

/**
 * Clase "falsa" para localStorage.
 * 
 * El acceso directo a localStorage desde un componente 
 * plantea problemas para testar el codigo: el código 
 * a partir de ese punto ya no es testable, porque 
 * cuando se ejecuta el test se está ejecutando en un 
 * navegador "limpio" que no tiene porqué tener los 
 * datos que el componente necesita. 
 * 
 * Solución: se implementan dos clases. La primera clase 
 * es ésta, y es la "mock" o testable. Usará un recurso 
 * en memoria para almacenar los valores, que se podrán 
 * establecer directamente mediante la llamada a un método.
 * 
 * 
 */
@Injectable({
  providedIn : 'root'
})
export class LocalStorage implements LocalStorageProvider {

  values : Map<string,string>;

  constructor() {
    this.values = new Map<string,string>();
  }

  setValues( values : [{key:string, value:string}] ){
    for( let value of values ){
      this.values.set( value.key, value.value );
    }
  }

  setItem( key : string, value : string ) : void {
    this.values.set( key, value ); 
  }

  getItem( key : string ) : string {
    return this.values.get( key );
  }

  removeItem( key : string  ) : void {
    this.values.delete( key );
  }

}