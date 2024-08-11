import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Db } from '../../../services/db.service';
import { Deporte } from '../../../modelo/deporte';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'clubes-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  nombre : string; 
  selectedDeporte : any;
  private deportes : Deporte[];

  constructor( private db : Db,
               private toastService: ToastService,
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() {
    this.db.getDeporte()
      .then( deportesList => {
        this.deportes = deportesList;
      } );
  }

  onClickCrear() {
    if( this.deportes.length === 1 )
      this.selectedDeporte = this.deportes[0];
    
    this.db.addClub( { nombre: this.nombre, deporte : this.db.getDeporteRef( this.selectedDeporte.id ) } )
      .then( _ => {
        this.toastService.sendToast( `Club ${this.nombre} creado con éxito`);
      })
      .then( _ => this.router.navigate( ['..'], { relativeTo : this.route } ) )
      .catch( (reason) => {
        this.toastService.sendToast(`Se ha producido un error al crear el club ${this.nombre}: ${reason}`);
      });
;
  }

  getDeportes() {
    return this.deportes;
  }

}


