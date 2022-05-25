import { Component, 
          OnInit, 
          AfterViewInit,
          ViewChild, 
          ElementRef } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-porteria',
  templateUrl: './porteria.component.html',
  styleUrls: ['./porteria.component.scss'],
})
export class PorteriaComponent implements OnInit, AfterViewInit {

  @ViewChild("porteria", { read: ElementRef, static: true } )
  porteria : ElementRef;

  constructor( public gestureCtrl : GestureController ) { }

  async ngAfterViewInit() {
    console.log("ngAfterViewInit start");
    let gesture = await this.gestureCtrl.create({
      el: this.porteria.nativeElement,
      gestureName : "primera-prueba", 
      gesturePriority : 100, 
      threshold: 5, 
      passive : false, 
      onStart : () => { console.log("onStart"); }, 
      onMove : ev => { console.log("onMove"); console.log(ev); }, 
      onEnd : ev => { console.log("onEnd"); console.log(ev); }
    });
    gesture.enable( true );
    console.log("ngAfterViewInit end");
  }

  ngOnInit() {}

  onPorteriaPan( event : any ){
    console.log( event );
  }

  onClick( event : any ){
    console.log( event );
  }

}
