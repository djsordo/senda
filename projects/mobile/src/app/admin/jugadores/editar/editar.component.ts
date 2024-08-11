import { Component, 
        HostListener, 
        OnDestroy, 
        OnInit, 
        viewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityService } from "../../../services/security.service";
import { Subscription } from "rxjs";


import { Db } from "../../../services/db.service";
import { Equipo } from "../../../modelo/equipo";
import { Jugador } from "../../../modelo/jugador";
import { ToastService } from "../../../services/toast.service";


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
  public generos = [
    {id: 'male', name: 'Masculino'},
    {id: 'female', name: 'Femenino'},
    {id: 'not-specified', name: 'N/A'}
  ];
  private paramSubscription: Subscription;
  private jugadorId: string = null;
  private datosJugador = viewChild<NgForm>('datosJugador');
  public equipos : Equipo[];
  public windowWidth : number; 
  public numberIsLocked : boolean = false;

  constructor( private db: Db,
               private toastService : ToastService,
               private security: SecurityService, 
               private route : ActivatedRoute,
               private router : Router ){ }

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
        "genero": jugadorData.genero?jugadorData.genero:this.generos.at(-1).id, 
        "edad": jugadorData.edad?jugadorData.edad:null,
        "portero": jugadorData.portero, 
        "equipos": jugadorData.equipoId,
        "telefono": jugadorData.telefono?jugadorData.telefono:"", 
        "tipoTelefono": jugadorData.tipoTelefono?jugadorData.tipoTelefono:null, 
        "email": jugadorData.email?jugadorData.email:null, 
        "notas": jugadorData.notas?jugadorData.notas:null });
    });
  }

  public onSubmit( datosJugador: Object ){
    console.log( datosJugador );
    datosJugador["fechaEdad"] = new Date();
    // change the name of the equipos list for "equipoId"
    datosJugador["equipoId"] = [...datosJugador["equipos"]];
    delete datosJugador["equipos"];
    console.log( datosJugador );
    if( this.isEditMode() ){
      this.db.updateJugador( this.jugadorId, <Jugador> datosJugador )
        .then( _ => 
          this.toastService.sendToast("Datos del jugador guardados con éxito")
        )
        .then( _ => 
          this.router.navigate(['/', 'admin', 'jugadores'])
        )
        .catch( error => {
          console.log( "error saving jugador: ", error ); 
          this.toastService.sendToast("Se ha producido un error al guardar los datos del jugador, vuelva a intentarlo");
        }
        );
    }else{
      this.db.addJugador( <Jugador> datosJugador )
        .then( _ => 
          this.toastService.sendToast("Datos del jugador guardados con éxito" )
        )
        .then( _ => 
          this.router.navigate(['/', 'admin', 'jugadores'])
        )
        .catch( error => {
          console.log( "error adding jugador: ", datosJugador );
          this.toastService.sendToast("Se ha producido un error al guardar los datos del jugador, vuelva a intentarlo");
        })
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

  public getJugadorId() {
    return this.jugadorId;
  }

}


