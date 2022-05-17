import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  proximosPartidos = [
    {fecha: '12/06/2022', partido: 'B.M. Laguna vs. San Agustín', lugar: 'Polideportivo Laguna'},
    {fecha: '19/06/2022', partido: 'San Agustín vs. B.M. Laguna', lugar: 'Polideportivo San Agustín'},
  ];

  anterioresPartidos = [
    {fecha: '22/05/2022', partido: 'B.M. Laguna vs. B.M. Castilla', lugar: 'Polideportivo Laguna'},
    {fecha: '29/05/2022', partido: 'B.M. Castilla vs. B.M. Laguna', lugar: 'Polideportivo Canterac'},
  ];

  constructor() { }

  public obtenerProximosPartidos(){
    return this.proximosPartidos;
  }
  public obtenerAnterioresPartidos(){
    return this.anterioresPartidos;
  }
}
