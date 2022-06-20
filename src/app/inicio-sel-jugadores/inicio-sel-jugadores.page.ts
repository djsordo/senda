import { PasoDatosService } from './../services/paso-datos.service';
import { Gesture, GestureController, IonCard, IonItem } from '@ionic/angular';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
/* import { UseExistingWebDriver } from 'protractor/built/driverProviders'; */

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

  jugadores = [
    {numero: '70', nombre: 'Daniel Vaquero', portero: true, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '10', nombre: 'Mario Palomo', portero: true, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '25', nombre: 'Adrián González', portero: false, posicion:'', foto: 'Adrian_Gonzalez_Garcia.jpeg'},
    {numero: '16', nombre: 'Javier de Torre', portero: false, posicion:'', foto: 'Javier_de_Torre_Sebastian.jpeg'},
    {numero: '17', nombre: 'Óscar Otero', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '45', nombre: 'Daniel Martín', portero: false, posicion:'', foto: 'Daniel_Martin_Paredes.jpeg'},
    {numero: '03', nombre: 'Adrián Pérez', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '53', nombre: 'Alex Garrido', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '98', nombre: 'Alejandro Álvarez', portero: false, posicion:'', foto: 'Alejandro_Alvarez_Castro.jpeg'},
    {numero: '39', nombre: 'Jorge Parra', portero: false, posicion:'', foto: 'Jorge_Parra_Gonzalez.jpeg'},
    {numero: '38', nombre: 'Gabriel Barriocanal', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '55', nombre: 'Rodrigo Méndez', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '47', nombre: 'Álvaro Recio', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '14', nombre: 'Marcos Alonso', portero: false, posicion:'', foto: 'Marcos_Alonso_Ulloa.jpeg'},
    {numero: '29', nombre: 'Santiago Luna', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '56', nombre: 'Jesús Hernández', portero: false, posicion:'', foto: 'SinImagen.jpg'},
    {numero: '28', nombre: 'César Vitores', portero: false, posicion:'', foto: 'Cesar_Vitores_Cosmes.jpeg'},
  ];

  listaInicial = [];
  listaBanquillo = [];
  listaNoConvocados = [];

  posiciones = ['EI', 'ED', 'PI', 'LI', 'LD', 'CE', 'PO'];
  numJugadores = this.posiciones.length;

  contentScrollActive = true;
  gestureArray: Gesture[] = [];

  constructor(private router: Router,
    private gestureCtrl: GestureController,
    private changeDetectorRef: ChangeDetectorRef,
    private pasoDatos: PasoDatosService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.updateGestures();
  }

  ngOnInit() {}

  updateGestures() {
    this.gestureArray.map(gesture => gesture.destroy());
    this.gestureArray = [];

    /* console.log('objetos: ', this.items); */
    const arr = this.items.toArray();
    console.log('arr: ', arr);

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
          console.log('i: ',i);
          this.contentScrollActive = true;
          this.handleDrop(oneItem, ev.currentX, ev.currentY, i);

        },
      });
      drag.enable();
      this.gestureArray.push(drag);
    }

    this.items.changes.subscribe(res => {
      if (this.gestureArray.length !== this.items.length) {
        console.log('item cambiado: ', res);
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
      this.dropNoConvocado.nativeElement.style.backgroundColor = 'white';
    }

    if (this.isInZone(x,y, dropBanquillo)) {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'white';
    }

    for (let i = 0; i < this.numJugadores; i++){
      if (this.isInZone(x,y, dropPos[i].nativeElement.getBoundingClientRect())) {
        dropPos[i].nativeElement.style.backgroundColor = 'blue';
      } else {
        dropPos[i].nativeElement.style.backgroundColor = 'white';
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
      console.log('item: ', removedItem[0]);
      this.listaNoConvocados.push(removedItem[0]);
      console.log('item: ', this.jugadores);
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
        !this.listaInicial.find(jugPos => jugPos.posicion === this.posiciones[i])) {
          const removedItem = this.jugadores.splice(index, 1);
          console.log('item: ', removedItem[0]);
          removedItem[0].posicion = this.posiciones[i];
          this.listaInicial.push(removedItem[0]);
          console.log('item: ', this.jugadores);
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

    this.dropNoConvocado.nativeElement.style.backgroundColor = 'white';
    this.dropBanquillo.nativeElement.style.backgroundColor = 'white';

    for (let i = 0; i < this.numJugadores; i++){
      dropPos[i].nativeElement.style.backgroundColor = 'white';
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

  irAModo() {
    this.pasoDatos.enviaListaInicial(this.listaInicial);
    this.pasoDatos.enviaListaBanquillo(this.listaBanquillo);
    this.router.navigate(['/modo-jugador']);
  }
}
