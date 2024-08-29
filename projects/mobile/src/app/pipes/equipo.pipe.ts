import { Pipe, PipeTransform } from "@angular/core";

import { Db } from "../services/db.service";

@Pipe({ name: 'equipoPipe' })
export class EquipoPipe implements PipeTransform {

  constructor( private db : Db ) {}

  transform( equipoId : any, value: string = "categoria+genero+nombre_corto" ) {
    return new Promise( (resolve) => {
       this.db.getEquipo( equipoId )
        .then( (equipo) => {
          if( equipo.categoria ){
            switch( value ) {
              case "categoria+genero": 
                resolve( `${equipo.categoria} ${equipo.genero}` );
                break; 
              default:
              case "categoria+genero+nombre_corto": 
                resolve( `${equipo.categoria} ${equipo.genero} ${equipo.nombreCorto?equipo.nombreCorto:''}` );
                break; 
              case "nombre": 
                resolve( equipo.nombre ); 
                break; 
            }
          }else{
            resolve('')
          }
        })
        .catch( () => resolve('') );
    });
  }
  
}

