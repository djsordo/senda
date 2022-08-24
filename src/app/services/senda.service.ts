import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';


/**
 * @deprecated - No encuentro ninguna utilidad ni ninguna funcion que desempeñe este servicio, 
 * además parece que sólamente se usa en el propio test 
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class SendaService {
  private platform: Platform;

  constructor( platform: Platform ) {
    this.platform = platform;
  }

}
