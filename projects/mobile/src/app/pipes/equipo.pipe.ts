import { Pipe, PipeTransform } from "@angular/core";

import { Db } from "../services/db.service";

@Pipe({ name: 'equipoPipe' })
export class EquipoPipe implements PipeTransform {

  constructor( private db : Db ) {}

  transform( equipoId : any, value: string = "categoria+genero" ) {
    return new Promise( (resolve, reject) => {
       this.db.getEquipo( equipoId )
        .then( (equipo) => {
          switch( value ) {
            default:
            case "categoria+genero": 
              resolve( `${equipo.categoria} ${equipo.genero}` );
              break; 
            case "nombre": 
              resolve( equipo.nombre ); 
              break; 
          }
        });
    });
  }
  
}

