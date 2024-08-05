import { Component, 
        HostListener, 
        OnDestroy, 
        OnInit, 
        viewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { SecurityService } from "../../../services/security.service";
import { Subscription } from "rxjs";


import { Db } from "../../../services/db.service";
import { Equipo } from "../../../modelo/equipo";
import { Jugador } from "../../../modelo/jugador";


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
  private jugadorId: string = null;
  private datosJugador = viewChild<NgForm>('datosJugador');
  public equipos : Equipo[];
  public windowWidth : number; 
  public numberIsLocked : boolean = true;

  constructor( private db: Db,
               private security: SecurityService, 
               private route : ActivatedRoute ){ }

  public ngOnInit(): void {
    this.db.getEquipo()
    .then( (equipos) => this.equipos = equipos )
    .then( (_) => this.subscribeToParams() );

    if( window ){
      this.windowWidth = window.innerWidth;
    }else
      this.windowWidth = 1000;
      
  }
  
  private subscribeToParams(){
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (paramMap) => {
        if( paramMap.get("userId") ) {
          this.loadJugador( paramMap.get("userId") );
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'] )
  onResize( event ){
    this.windowWidth = event.srcElement.innerWidth;
  }

  public ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  private loadJugador( jugadorId : string ){
    console.log( "jugadorid", jugadorId );
    this.db.getJugador( jugadorId )
    .then((jugadorData) => {
      console.log( jugadorData );
      this.numberIsLocked = true;
      this.jugadorId = jugadorData.id;
      this.datosJugador().setValue({
        "numero": jugadorData.numero, 
        "nombre": jugadorData.nombre,
        "genero": "", // jugadorData?.genero, 
        "edad": "", //jugadorData?.edad,
        "portero": jugadorData.portero, 
        "equipos": jugadorData.equipoId,
        "telefono": "", // jugadorData?.telefono, 
        "tipoTelefono": "", // jugadorData?.tipoTelefono, 
        "email": null, 
        "notas": null });
    });
  }

  public onSubmit( datosJugador: Object ){
    console.log( datosJugador );
    if( this.isEditMode() ){
      datosJugador["fechaEdad"] = new Date();
      // change the name of the equipos list for "equipoId"
      datosJugador["equipoId"] = [...datosJugador["equipos"]];
      delete datosJugador["equipos"];
      console.log( datosJugador );
      this.db.updateJugador( this.jugadorId, <Jugador> datosJugador );
    }else{
      // creation of a new player
    }
  }

  public isEditMode() : boolean{
    return this.jugadorId != null;
  }

  public unlockNumber() {
    this.numberIsLocked = false;
  }

  public lockNumber() {
    this.numberIsLocked = true;
  }

  public onCancel(){
    
  }


}


