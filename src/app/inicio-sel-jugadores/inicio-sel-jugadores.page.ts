import { GestureController, IonItem } from '@ionic/angular';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sel-jugadores',
  templateUrl: './inicio-sel-jugadores.page.html',
  styleUrls: ['./inicio-sel-jugadores.page.scss'],
})
export class InicioSelJugadoresPage implements OnInit {
  @ViewChild('dropInicial') dropInicial: ElementRef;
  @ViewChild('dropBanquillo') dropBanquillo: ElementRef;
  @ViewChildren(IonItem, {read: ElementRef }) items: QueryList<ElementRef>;

  jDisponibles = Array.from(Array(30).keys());
  listaInicial = [];
  listaBanquillo = [];
  contentScrollActive = true;

  constructor(private router: Router,
              private gestureCtrl: GestureController) { }

  ngAfterViewInit(){
    this.updateGestures();
  }

  ngOnInit() {
  }

  updateGestures(){
    console.log('objetos: ',this.items);
    const arr= this.items.toArray();
    console.log('arr: ',arr);
    for (let i = 0; i  < arr.length; i++){
      const oneItem = arr[i];

      const drag = this.gestureCtrl.create({
        el: oneItem.nativeElement,
        threshold: 1,
        gestureName: 'drag',
        onStart: ev => {

        },
        onMove: ev => {

        },
        onEnd: ev => {

        }
      });
      drag.enable();
    }
  }

  irAModo(){
    this.router.navigate(['/modo-jugador']);
  }
}
