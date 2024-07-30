import { Component, 
        OnDestroy, 
        OnInit, 
        viewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { SecurityService } from "../../../services/security.service";
import { Subscription } from "rxjs";


import { Db } from "../../../services/db.service";


@Component({
  selector: 'jugadores-editar', 
  templateUrl: './editar.component.html', 
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit, OnDestroy {

  public tiposTelefono = [
    {id: 'personal', name: 'Personal'}, 
    {id: 'parents', name: 'De sus padres'}, 
    {id: 'relatives', name: 'De un familiar'},
    {id: 'other', name: 'Otro'}
  ];
  private paramSubscription: Subscription;
  private datosJugador = viewChild<NgForm>('datosJugador');

  constructor( private db: Db,
               private security: SecurityService, 
               private route : ActivatedRoute ){ }

  public ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (paramMap) => this.loadJugador( paramMap.get("userId") )
    });

    setTimeout( () => {
      console.log("setTimeout");
    }, 1 );
  }

  public ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  private loadJugador( jugadorId : string ){
    console.log( "jugadorid", jugadorId );
    this.db.getJugador( jugadorId )
    .then((jugadorData) => {
      console.log( jugadorData );
      this.datosJugador().setValue({
        "numero": jugadorData.numero, 
        "nombre": jugadorData.nombre,
        "genero": "", // jugadorData?.genero, 
        "edad": "", //jugadorData?.edad,
        "portero": jugadorData.portero, 
        "equipos": [],
        "telefono": "", // jugadorData?.telefono, 
        "tipoTelefono": "", // jugadorData?.tipoTelefono, 
        "email": null, 
        "notas": null });
    });
  }

  public onSubmit( datosJugador: NgForm ){
    console.log( datosJugador.form );

  }

  public onCancel(){
    this
  }


}


