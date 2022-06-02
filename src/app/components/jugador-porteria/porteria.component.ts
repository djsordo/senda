import { Component, 
          OnInit, 
          AfterViewInit,
          ViewChild, 
          Input,
          Output,
          EventEmitter, 
          ElementRef } from '@angular/core';
import { GestureController } from '@ionic/angular';

const X = 0; 
const Y = 1;

/**
 * Muestra una imagen al usuario y le permite hacer click en 
 * ciertas áreas "calientes": devolverá las áreas clickadas. 
 * 
 * Identificación de si un punto está dentro de un polígono 
 * tomado de: 
 * https://www.geeksforgeeks.org/how-to-check-if-a-given-point-lies-inside-a-polygon
 * 
 */
@Component({
  selector: 'app-porteria',
  templateUrl: './porteria.component.html',
  styleUrls: ['./porteria.component.scss'],
})
export class PorteriaComponent implements OnInit, AfterViewInit {

  @ViewChild("porteria", { read: ElementRef, static: true } )
  porteria : ElementRef;
  @ViewChild("equis1", {read: ElementRef, static: true } )
  equis1 : ElementRef; 
  public porteriaStyle = { position: 'relative',
                          top: 0,
                          left: 0  };
  @Input() areas;
  @Input() equis1Style = { position : 'absolute', 
                  left: '1px', 
                  top : '1px',
                  visibility: 'hidden' };
  @Output() equis1StyleChange = new EventEmitter<object>();

  constructor( public gestureCtrl : GestureController ) { }

  async ngAfterViewInit() {
    /*
    let gesture = this.gestureCtrl.create({
      el: this.porteria.nativeElement,
      gestureName : "primera-prueba", 
      gesturePriority : 100, 
      threshold: 5, 
      passive : false, 
      onStart : () => { console.log("onStart"); }, 
      onMove : ev => { console.log("onMove"); console.log(ev); }, 
      onEnd : ev => { console.log("onEnd"); console.log(ev); }
    });
    gesture.enable( true );*/
  }

  ngOnInit() {
  }

  /**
   * transforma los puntos dados en el array de áreas 
   * en puntos de la imagen
   */
  private adaptaAreas(){
    let actualWidth = this.porteria.nativeElement.width;
    let actualHeight = this.porteria.nativeElement.height; 
    for( let area of this.areas ){
      area.polygonAdapted = [];
      for( let point of area.polygon ){
        let x = point[X] * actualWidth;
        let y = point[Y] * actualHeight;
        area.polygonAdapted.push([x, y]);
      }
    }
  }

  public onPorteriaClick( event ){
    if( event.target.id === "porteria" ){
      this.adaptaAreas();
      this.equis1Style.left = `${event.offsetX - (this.equis1.nativeElement.width / 2)}px`;
      this.equis1Style.top = `${event.offsetY - (this.equis1.nativeElement.height / 2)}px`;
      this.equis1Style.visibility = 'visible';
      console.log( `el area se llama ${this.getAreaNameOfPoint( [ event.offsetX, event.offsetY ] )}` );
    }
  }

  private getAreaNameOfPoint( point : Array<number>){
    let areas = [];
    for( let area of this.areas ){
      if( this.isPointInsidePolygon( point, area.polygonAdapted )){
        areas.push( area.name );
      }
    }
    return areas;
  }


  /**
   * Dados tres puntos p, q, r <b>que estarán en la misma linea</b>
   * esta función indica si el punto q está en el segmento pr.
   */
  private onSegment( p : Array<number>, 
                     q : Array<number>, 
                     r : Array<number> ) : boolean {
    return (Math.min( p[X], r[X] ) <= q[X] && q[X] <= Math.max( p[Y], r[Y] ) )
        && (Math.min( p[Y], r[Y] ) <= q[Y] && q[Y] <= Math.max( p[Y], r[Y] ) );
  }

  /**
   * retorna 0 si los tres puntos dados están en el mismo segmento, 
   * 1 o 2 si el punto q se encuentra en sentido de las agujas 
   * del reloj. 
   * 
   * Nota: por la simulación que he efectuado, los valores 1 o 2 
   * indicarán cuanto el punto esté por debajo o a la derecha del 
   * segmento PR o bien arriba o a la izquierda.
   * 
   */
  private orientation( p : Array<number>, 
                       q : Array<number>, 
                       r : Array<number> ): 0 | 1 | 2{

    let val = (q[Y] - p[Y]) * (r[X] - q[X])
           - (q[X] - p[X]) * (r[Y] - q[Y]);

    // this is a "val == 0" but tolerant with floating point numbers
    if(-0.0001 <= val && val <= 0.0001)
    {
        return 0; // collinear
    }
    return (val > 0) ? 1 : 2; // clock or counterclock wise
  }

  private doIntersect( p1 : Array<number>, 
                       q1 : Array<number>, 
                       p2 : Array<number>, 
                       q2 : Array<number> ){

    let o1 = this.orientation(p1, q1, p2);
    let o2 = this.orientation(p1, q1, q2);
    let o3 = this.orientation(p2, q2, p1);
    let o4 = this.orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4){
        return true;
    }

    // Special Cases
    // p1, q1 and p2 are collinear and
    // p2 lies on segment p1q1
    if (o1 == 0 && this.onSegment(p1, p2, q1)){
        return true;
    }

    // p1, q1 and p2 are collinear and
    // q2 lies on segment p1q1
    if (o2 == 0 && this.onSegment(p1, q2, q1)){
        return true;
    }

    // p2, q2 and p1 are collinear and
    // p1 lies on segment p2q2
    if (o3 == 0 && this.onSegment(p2, p1, q2)){
        return true;
    }

    // p2, q2 and q1 are collinear and
    // q1 lies on segment p2q2
    if (o4 == 0 && this.onSegment(p2, q1, q2)){
        return true;
    }

    // Doesn't fall in any of the above cases
    return false;    
  }

  private isOdd( num ) {
    return (num % 2) == 1;
  }

  public isPointInsidePolygon( point : Array<number>, 
                                polygon: Array<Array<number>> ){
    if( polygon.length < 3 ) 
      return false; 
    let INFINITE = 10000; /* use of MAX_INT can cause overflow */
    let extreme = [INFINITE, point[Y]]; 
    let intersections = 0; 
    let i = 0;
    do{
      let next = (i+1) % polygon.length;
      if( this.doIntersect(polygon[i], polygon[next], 
                              point, extreme )){
        if( this.orientation( polygon[i], point, polygon[next] ) == 0 /* collinear */ ) {
          return this.onSegment( polygon[i], point, polygon[next] );
        }
        intersections++;
      }
      i = next;
    }while( i != 0 );

    // condición para que un punto esté dentro
    // de un polígono es que el número de 
    // intersecciones sea impar
    return this.isOdd( intersections );
  }

}



