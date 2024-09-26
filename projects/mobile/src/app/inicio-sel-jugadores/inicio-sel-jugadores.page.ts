import { Acciones, EventosService } from 'projects/mobile/src/app/services/eventos.service';
import { Gesture, GestureController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PasoDatosService } from './../services/paso-datos.service';
import { Jugador } from '../modelo/jugador';
import { Db } from '../services/db.service';
import { where } from '@angular/fire/firestore';
import { Partido } from '../modelo/partido';
import { initEstadJugador } from '../modelo/estadJugador';

@Component({
  selector: 'app-inicio-sel-jugadores',
  templateUrl: './inicio-sel-jugadores.page.html',
  styleUrls: ['./inicio-sel-jugadores.page.scss'],
})
export class InicioSelJugadoresPage implements OnInit {
  @ViewChild('dropNoConvocado') dropNoConvocado: ElementRef;
  @ViewChild('dropBanquillo') dropBanquillo: ElementRef;

  @ViewChildren('drops', {read: ElementRef}) cajasDrop: QueryList<ElementRef>;
  @ViewChildren('cards', {read: ElementRef}) items: QueryList<ElementRef>;

  jugadores: Array<Jugador> = [];

  partido: Partido;
  listaInicial: Array<Jugador> = [];
  listaBanquillo: Array<Jugador> = [];
  listaNoConvocados: Array<Jugador> = [];

  posiciones = [
    {clave: 'PO', desc: 'Portero'},
    {clave: 'EI', desc: 'Extremo Izquierdo'},
    {clave: 'ED', desc: 'Extremo Derecho'},
    {clave: 'LI', desc: 'Lateral Izquierdo'},
    {clave: 'LD', desc: 'Lateral Derecho'},
    {clave: 'CE', desc: 'Central'},
    {clave: 'PI', desc: 'Pivote'}];

  numJugadores = this.posiciones.length;

  contentScrollActive = true;
  gestureArray: Gesture[] = [];

  constructor(
    private db : Db,
    private router: Router,
    private gestureCtrl: GestureController,
    private changeDetectorRef: ChangeDetectorRef,
    private pasoDatos: PasoDatosService,
    private eventosService: EventosService,
    private activatedRoute : ActivatedRoute ) {
    }

  ngAfterViewInit() {
    this.updateGestures();
  }

  ngOnInit() {
    this.listaInicial = [];
    this.listaBanquillo = [];
    this.activatedRoute.params.subscribe( (paramData: Params) => {
      this.db.getPartido( paramData.partidoId )
        .then( (partido) => {
          this.partido = partido;
          return( partido.equipoId );
        })
        .then( (equipoId) => {
          this.db.getJugador( where( "equipoId", "array-contains", equipoId ) )
          .then( listaJugadores => this.jugadores = listaJugadores );
        });
    });
  }

  updateGestures() {
    this.gestureArray.map(gesture => gesture.destroy());
    this.gestureArray = [];

    const arr = this.items.toArray();

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arr.length; i++){
      const oneItem = arr[i];

      const drag = this.gestureCtrl.create({
        el: oneItem.nativeElement,
        threshold: 0,
        gestureName: 'drag',
        onStart: (ev) => {
          oneItem.nativeElement.style.transition = '';
          oneItem.nativeElement.style.opacity = '0.8';
          oneItem.nativeElement.style.fontweight = 'bold';
          this.contentScrollActive = false;
          this.changeDetectorRef.detectChanges();
        },
        onMove: (ev) => {
          oneItem.nativeElement.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
          oneItem.nativeElement.style.zIndex = 11;
          this.checkDropZoneHover(ev.currentX, ev.currentY);

        },
        onEnd: (ev) => {
          this.contentScrollActive = true;
          this.handleDrop(oneItem, ev.currentX, ev.currentY, i);

        },
      });
      drag.enable();
      this.gestureArray.push(drag);
    }

    this.items.changes.subscribe(res => {
      if (this.gestureArray.length !== this.items.length) {
        this.updateGestures();
      }
    });
  }

  // Check if we are dragging above a dropzone
  checkDropZoneHover(x,y){
    const dropNoConvocado = this.dropNoConvocado.nativeElement.getBoundingClientRect();
    const dropBanquillo = this.dropBanquillo.nativeElement.getBoundingClientRect();
    const dropPos = this.cajasDrop.toArray();

    if (this.isInZone(x,y, dropNoConvocado)) {
      this.dropNoConvocado.nativeElement.style.backgroundColor = 'red';
    } else {
      this.dropNoConvocado.nativeElement.style.backgroundColor = 'transparent';
    }

    if (this.isInZone(x,y, dropBanquillo)) {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'transparent';
    }

    for (let i = 0; i < this.numJugadores; i++){
      if (this.isInZone(x,y, dropPos[i].nativeElement.getBoundingClientRect())) {
        dropPos[i].nativeElement.style.backgroundColor = 'blue';
      } else {
        dropPos[i].nativeElement.style.backgroundColor = 'transparent';
      }
    }
  }

  // Check if coordinates are whitin a dropzone rect
  isInZone(x,y, dropzone){
    if (x < dropzone.left || x >= dropzone.right) {
      return false;
    }

    if (y < dropzone.top || y >= dropzone.bottom) {
      return false;
    }
    return true;
  }

  // Decide what to do with dropped item
  handleDrop(item, endX, endY, index){
    const dropNoConvocado = this.dropNoConvocado.nativeElement.getBoundingClientRect();
    const dropBanquillo = this.dropBanquillo.nativeElement.getBoundingClientRect();
    const dropPos = this.cajasDrop.toArray();

    let haCaido = false;

    if (this.isInZone(endX, endY, dropNoConvocado)) {
      // Cae en la zona de no convocado
      const removedItem = this.jugadores.splice(index, 1);
      this.listaNoConvocados.push(removedItem[0]);
      item.nativeElement.remove();
      haCaido = true;
    } else if (this.isInZone(endX, endY, dropBanquillo)) {
      // Cae en la zona de banquillo
      const removedItem = this.jugadores.splice(index, 1);
      this.listaBanquillo.push(removedItem[0]);
      item.nativeElement.remove();
      haCaido = true;
    } else {
      // Cae en cualquier posición de jugador
      for (let i = 0; i < this.numJugadores; i++){
        if (this.isInZone(endX, endY, dropPos[i].nativeElement.getBoundingClientRect()) &&
        !this.listaInicial.find(jugPos => jugPos.posicion === this.posiciones[i].clave)) {
          const removedItem = this.jugadores.splice(index, 1);
          removedItem[0].posicion = this.posiciones[i].clave;
          this.listaInicial.push(removedItem[0]);
          item.nativeElement.remove();
          haCaido = true;
        }
      }
    }

    if (!haCaido) {
      // No cae en ninguno de los sitios
      // Vuelve a la posición inicial
      item.nativeElement.style.transition = '.2s ease-out';
      item.nativeElement.style.zIndex = 'inherit';
      item.nativeElement.style.transform = 'translate(0, 0)';
      item.nativeElement.style.opacity = '1';
      item.nativeElement.style.fontweight = 'normal';
    }

    this.dropNoConvocado.nativeElement.style.backgroundColor = 'transparent';
    this.dropBanquillo.nativeElement.style.backgroundColor = 'transparent';

    for (let i = 0; i < this.numJugadores; i++){
      dropPos[i].nativeElement.style.backgroundColor = 'transparent';
    }
    this.changeDetectorRef.detectChanges();
  }

  // se devuelve a la pila de jugadores elegibles el último dato de la lista correspondiente
  borraJugador(lista: any){
    if (lista === 'listaNoConvocados'){
      if (this.listaNoConvocados.length !== 0){
        const removedItem = this.listaNoConvocados.splice(this.listaNoConvocados.length-1, 1);
        this.jugadores.push(removedItem[0]);
        this.changeDetectorRef.detectChanges();
      }
    } else if (lista === 'listaBanquillo'){
      if (this.listaBanquillo.length !== 0){
        const removedItem = this.listaBanquillo.splice(this.listaBanquillo.length-1, 1);
        this.jugadores.push(removedItem[0]);
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  // Borra el jugador de la posicion x en la lista inicial
  borraPos(posicion: any){
    const indice = this.listaInicial.indexOf(this.listaInicial.find(jugPos => jugPos.posicion === posicion));
    if (indice >= 0) {
      const removedItem = this.listaInicial.splice(indice, 1);
      removedItem[0].posicion = '';
      this.jugadores.push(removedItem[0]);
      this.changeDetectorRef.detectChanges();
    }
  }

  // Borra el jugador de numero n la lista
  borraNum(lista: any, numero: any){
    const indice = lista.indexOf(lista.find(jugNum => jugNum.numero === numero));
    if (indice >= 0) {
      const removedItem = lista.splice(indice, 1);
      this.jugadores.push(removedItem[0]);
      this.changeDetectorRef.detectChanges();
    }
  }

  doTest() {
    console.log( "listaexcluidos:", this.pasoDatos.listaExcluidos );
  }

  irAModo() {
    // Se crean eventos de titulares, banquillo y no convocado.
    this.listaInicial.forEach(jug => {
      // Se crea el evento para la base de datos
      const eventoJugador = this.eventosService.newEvento();
      eventoJugador.accionPrincipal = Acciones.titular;
      eventoJugador.creadorEvento = jug.nombre;
      eventoJugador.jugadorId = jug.id;
      eventoJugador.partidoId = this.partido.id;
      eventoJugador.equipoId = this.partido.equipoId;
      this.pasoDatos.onEventoJugador( eventoJugador );

      this.eventosService.addEventoBD(eventoJugador).then(even => {eventoJugador.id = even.id;});
    });

    this.listaBanquillo.forEach(jug => {
      // Se crea el evento para la base de datos
      const eventoJugador = this.eventosService.newEvento();
      eventoJugador.accionPrincipal = Acciones.banquillo;
      eventoJugador.creadorEvento = jug.nombre;
      eventoJugador.jugadorId = jug.id;
      eventoJugador.partidoId = this.partido.id;
      eventoJugador.equipoId = this.partido.equipoId;
      this.pasoDatos.onEventoJugador( eventoJugador );

      this.eventosService.addEventoBD(eventoJugador).then(even => {eventoJugador.id = even.id;});
    });

    this.listaNoConvocados.forEach(jug => {
      // Se crea el evento para la base de datos
      const eventoJugador = this.eventosService.newEvento();
      eventoJugador.accionPrincipal = Acciones.noConvocado;
      eventoJugador.creadorEvento = jug.nombre;
      eventoJugador.jugadorId = jug.id;
      eventoJugador.partidoId = this.partido.id;
      eventoJugador.equipoId = this.partido.equipoId;
      this.pasoDatos.onEventoJugador( eventoJugador );

      this.eventosService.addEventoBD(eventoJugador).then(even => {eventoJugador.id = even.id;});
    });

    this.pasoDatos.listaEliminados = [];
    this.pasoDatos.listaExcluidos = [];
    this.pasoDatos.listaInicial = this.listaInicial;
    this.pasoDatos.listaBanquillo = this.convertListaBanquillo( this.listaBanquillo );
    this.pasoDatos.jugCampo = this.getJugCampo( this.pasoDatos.listaInicial );
    this.pasoDatos.portero = this.getPortero( this.pasoDatos.listaInicial );

    console.log( "lista inicial:", this.pasoDatos.listaInicial ); 
    console.log( "lista banquillo: ", this.pasoDatos.listaBanquillo );
    console.log( "lista excluidos: ", this.pasoDatos.listaExcluidos );
    console.log( "lista eliminados: ", this.pasoDatos.listaEliminados );

    this.router.navigate(['/modo-jugador', this.partido.id]);
  }

  private convertListaBanquillo( listaBanquillo ){
    return listaBanquillo.map( x =>  {
      const estadJugador = initEstadJugador();
      estadJugador.datos = x; 
      estadJugador.partidoId = this.partido.id;
    })
    .sort( (x,y) => x.datos.numero.localeCompare(y.datos.numero) );
  }

  private getJugCampo( listaInicial ){
    let result = []; 

    for(let jugador of listaInicial){
      if( jugador.posicion !== 'PO' ){
        const estadJugador =  initEstadJugador();
        estadJugador.datos = jugador;
        estadJugador.exclusion = false;
        estadJugador.partidoId = this.partido.id;
        result.push( estadJugador );
      }
    }
    return result.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero));
  }

  private getPortero( listaInicial ){
    let portero = listaInicial.find( x => x.posicion === 'PO' );
    if( portero ){
      const estadJugador = initEstadJugador();
      estadJugador.datos = portero;
      portero.exclusion = false; 
      portero.partidoId = this.partido.id;
      return estadJugador;
    }
    return null;
  }

}
