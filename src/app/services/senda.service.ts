import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SendaService {
  private platform: Platform;

  constructor( platform: Platform ) {
    this.platform = platform;
  }

}
