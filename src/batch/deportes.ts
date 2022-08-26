
import { Menu, 
        doNothing } from './menu.js';

export async function menuDeportes(){
  let menu = new Menu( 'Deportes', 
              [ {value: 1, name: 'Alta deporte', action: doNothing },
                {value: 2, name: 'Baja deporte', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }]);
  return menu.show();
}


class Deportes {

  constructor( ) {}

  
}
