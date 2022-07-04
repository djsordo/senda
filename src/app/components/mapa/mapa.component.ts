import { Component, 
        ViewChild,
        OnInit,
        Input, 
        Output,
        HostListener,
        ElementRef,
        EventEmitter} from '@angular/core';

const X = 0; 
const Y = 1;

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @ViewChild("mapaImg", { read: ElementRef, static : true } )
  mapaImg : ElementRef;
  public mapaStyle = { position: 'relative',
            zIndex: '50',
            top: 0,
            left: 0  };
  @Input() svgStyle = { position : 'absolute', 
            zIndex: '100', 
            left: '0px', 
            top : '0px' };
  @Input() image : string;
  @Input() polygons;
  private cachedActualWidth : number;
  private cachedActualHeight : number;
  private cachedPolygons : Array<object>;
  @Input() pointerStyle = {'visibility': 'hidden', 
                          'stroke': '#420b0b',
                          'strokeWidth' :5.556,
                          'strokeLinecap' : 'round',
                          'strokeMiterlimit' : 4};
  pointerDots : string;
  @Output() areaClickedEvent = new EventEmitter<string>();

  constructor( ) {  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'] )
  onResize( event ){
    this.getPolygonsConverted();
  }

  public getPolygonsConverted(){
    if( this.cachedActualWidth !== this.mapaImg.nativeElement.width 
     || this.cachedActualHeight !== this.mapaImg.nativeElement.height )
       this.calculatePolygonsConverted();
    return this.cachedPolygons;
  }

  public calculatePolygonsConverted(){
    this.cachedActualWidth = this.mapaImg.nativeElement.width;
    this.cachedActualHeight = this.mapaImg.nativeElement.height; 
    this.cachedPolygons = [];
    for( let polygon of this.polygons ){
      let convertedPoints = "";
      for( let point of polygon.points ){
        convertedPoints += `${point[X] * this.cachedActualWidth}, 
                            ${point[Y] * this.cachedActualHeight} `;
      }
      this.cachedPolygons.push( { 'id' : polygon.id, 
                            'points' : convertedPoints });
    }
    return this.cachedPolygons;
  }

  public onClickPolygon( event ) : void {
    if( event.srcElement.id !== "equis" ){
      let x = event.offsetX;
      let y = event.offsetY;
      let w = 10;
      this.areaClickedEvent.emit( event.srcElement.id );
      this.pointerStyle.visibility = 'visible';
      this.pointerDots =  `M ${x-w},${y-w} ${x+w},${y+w} 
                            M ${x+w},${y-w} ${x-w},${y+w}`; 
    }
  }

}
