
import { Menu, 
        doNothing } from './menu.js';

export async function menuEquipos(){
  let menu = new Menu( 'Equipos', 
              [ {value: 1, name: 'Alta equipo', action: doNothing },
                {value: 2, name: 'Baja equipo', action: doNothing },
                {value: 3, name: 'Modificar equipo', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }]);
  return menu.show();
}

