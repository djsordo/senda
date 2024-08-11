import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private toastController : ToastController ){}

  public sendToast( message: string, 
                    duration : number = 2000, 
                    position : 'top' | 'bottom' | 'middle' = 'middle' ): Promise<any> {
    return this.toastController.create({
        message: message, 
        duration: duration, 
        position: position 
      })
      .then( (val : HTMLIonToastElement) => {
        return val.present();
      });
    }
}




