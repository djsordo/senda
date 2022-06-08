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

@Component({
  selector: 'app-inicio-sel-jugadores',
  templateUrl: './inicio-sel-jugadores.page.html',
  styleUrls: ['./inicio-sel-jugadores.page.scss'],
})
export class InicioSelJugadoresPage implements OnInit {
  @ViewChild('dropInicial') dropInicial: ElementRef;
  @ViewChild('dropBanquillo') dropBanquillo: ElementRef;
  @ViewChildren(IonCard, { read: ElementRef }) items: QueryList<ElementRef>;

  jugadores = [
    {numero: '28', nombre: 'César Vitores', portero: false},
    {numero: '70', nombre: 'Daniel Vaquero', portero: true},
    {numero: '10', nombre: 'Mario Palomo', portero: true},
    {numero: '25', nombre: 'Adrián González', portero: false},
    {numero: '16', nombre: 'Javier de Torre', portero: false},
    {numero: '17', nombre: 'Óscar Otero', portero: false},
    {numero: '45', nombre: 'Daniel Martín', portero: false},
    {numero: '3', nombre: 'Adrián Pérez', portero: false},
    {numero: '53', nombre: 'Alex Garrido', portero: false},
    {numero: '98', nombre: 'Alejandro Álvarez', portero: false},
    {numero: '39', nombre: 'Jorge Parra', portero: false},
    {numero: '38', nombre: 'Gabriel Barriocanal', portero: false},
    {numero: '55', nombre: 'Rodrigo Méndez', portero: false},
    {numero: '47', nombre: 'Álvaro Recio', portero: false},
    {numero: '14', nombre: 'Marcos Alonso', portero: false},
    {numero: '29', nombre: 'Santiago Luna', portero: false},
    {numero: '56', nombre: 'Jesús Hernández', portero: false},
  ];

  jDisponibles = Array.from(Array(30).keys());
  listaInicial = [];
  listaBanquillo = [];
  contentScrollActive = true;
  gestureArray: Gesture[] = [];

  constructor(private router: Router, private gestureCtrl: GestureController, private changeDetectorRef: ChangeDetectorRef) {}

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
    /* console.log('arr: ', arr); */

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
        console.log('item cambiado: ', res);
        this.updateGestures();
      }
    });
  }

  // Check if we are dragging above a dropzone
  checkDropZoneHover(x,y){
    const dropInicial = this.dropInicial.nativeElement.getBoundingClientRect();
    const dropBanquillo = this.dropBanquillo.nativeElement.getBoundingClientRect();

    if (this.isInZone(x,y, dropInicial)) {
      this.dropInicial.nativeElement.style.backgroundColor = 'blue';
    } else {
      this.dropInicial.nativeElement.style.backgroundColor = 'white';
    }

    if (this.isInZone(x,y, dropBanquillo)) {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'red';
    } else {
      this.dropBanquillo.nativeElement.style.backgroundColor = 'white';
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
    const dropInicial = this.dropInicial.nativeElement.getBoundingClientRect();
    const dropBanquillo = this.dropBanquillo.nativeElement.getBoundingClientRect();

    if (this.isInZone(endX, endY, dropInicial)) {
      // Cae en la zona de equipo inicial
      const removedItem = this.jDisponibles.splice(index, 1);
      this.listaInicial.push(removedItem[0]);
      item.nativeElement.remove();
    } else if (this.isInZone(endX, endY, dropBanquillo)) {
      // Cae en la zona de banquillo
      const removedItem = this.jDisponibles.splice(index, 1);
      this.listaBanquillo.push(removedItem[0]);
      item.nativeElement.remove();
    } else {
      // No cae en ninguno de los dos sitios
      // Vuelve a la posición inicial
      item.nativeElement.style.transition = '.2s ease-out';
      item.nativeElement.style.zIndex = 'inherit';
      item.nativeElement.style.transform = 'translate(0, 0)';
      item.nativeElement.style.opacity = '1';
      item.nativeElement.style.fontweight = 'normal';
    }

    this.dropInicial.nativeElement.style.backgroundColor = 'white';
    this.dropBanquillo.nativeElement.style.backgroundColor = 'white';
    this.changeDetectorRef.detectChanges();
  }

  irAModo() {
    this.router.navigate(['/modo-jugador']);
  }
}
