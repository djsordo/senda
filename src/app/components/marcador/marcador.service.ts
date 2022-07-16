import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MarcadorService {
  marcador={
    nuestro: 0,
    rival: 0,
  };

  constructor( ) {
  }

  gol(){
    this.marcador.nuestro++;
  }

  golRival(){
    this.marcador.rival++;
  }

  getMarcador(nosotros: boolean){
    if (nosotros){
      return this.marcador.nuestro;
    }
    else{
      return this.marcador.rival;
    }
  }

}
