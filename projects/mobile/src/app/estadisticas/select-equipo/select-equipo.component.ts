import { Component, OnInit } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Equipo } from '../../modelo/equipo';

import { EquipoService } from '../../services/equipo.service';


@Component({
  selector: 'app-select-equipo',
  templateUrl: './select-equipo.component.html',
  styleUrls: ['./select-equipo.component.scss']
})
export class SelectEquipoComponent implements OnInit {

  public equipos : any;
  public selectedEquipo : Equipo;

  constructor( private equipoService : EquipoService ) { }

  ngOnInit() {
    this.selectedEquipo = null;
    this.loadEquipos();
  }

  private loadEquipos() {
    this.equipoService.getEquipos()
    .then( (elements : QuerySnapshot<DocumentData>) => {
      this.equipos = [];
      elements.forEach( elem => {
        let data = elem.data();
        data.id = elem.id;
        this.equipos.push(data);
        } );
    });
  }

  public onSelectedEquipo( equipo: Equipo ){
    this.selectedEquipo = equipo;
  }

}
