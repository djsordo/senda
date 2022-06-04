import { Component, 
        ViewChild,
        OnInit,
        Input, 
        ElementRef} from '@angular/core';

const X = 0; 
const Y = 1;

@Component({
  selector: 'porteria-svg',
  templateUrl: './porteria-svg.component.html',
  styleUrls: ['./porteria-svg.component.scss'],
})
export class PorteriaSvgComponent implements OnInit {

  @ViewChild("porteriaImg", { read: ElementRef, static : true } )
  porteriaImg : ElementRef;
  public porteriaStyle = { position: 'relative',
            zIndex: '50',
            top: 0,
            left: 0  };
  @Input() svgStyle = { position : 'absolute', 
            zIndex: '100', 
            left: '0px', 
            top : '0px' };
  private polygons = [{ 'name' : 'arr_izq',
                'points' : [[0.258009153318078, 0.147], 
                [0.43421052631579, 0.147], 
                [0.43421052631579, 0.362], 
                [0.258009153318078, 0.362]]},
                {'name' : 'arr_cen',
                'points' :   [[0.43421052631579, 0.147], 
                [0.609267734553776, 0.147], 
                [0.609267734553776, 0.362], 
                [0.43421052631579, 0.362]]},
                {'name' : 'arr_der',
                'points' :   [[0.609267734553776, 0.147], 
                [0.795766590389016, 0.147], 
                [0.795766590389016, 0.362], 
                [0.609267734553776, 0.362]]},
                {'name' : 'cen_izq',
                'points' :   [[0.258009153318078, 0.362], 
                [0.43421052631579, 0.362], 
                [0.43421052631579, 0.583], 
                [0.258009153318078, 0.582]]},
                {'name' : 'cen_cen',
                'points' :   [[0.43421052631579, 0.362], 
                [0.609267734553776, 0.362], 
                [0.609267734553776, 0.583], 
                [0.43421052631579, 0.583]]},
                {'name' : 'cen_der',
                'points' :   [[0.609267734553776, 0.362], 
                [0.795766590389016, 0.362], 
                [0.795766590389016, 0.583], 
                [0.609267734553776, 0.583]]},
                {'name' : 'aba_izq',
                'points' :   [[0.258009153318078, 0.583], 
                [0.43421052631579, 0.583], 
                [0.43421052631579, 0.806], 
                [0.258009153318078, 0.806]]},
                {'name' : 'aba_cen',
                'points' :   [[0.43421052631579, 0.583], 
                [0.609267734553776, 0.583], 
                [0.609267734553776, 0.806], 
                [0.43421052631579, 0.806]]},
                {'name' : 'aba_der',
                'points' :   [[0.609267734553776, 0.583], 
                [0.795766590389016, 0.583], 
                [0.795766590389016, 0.806], 
                [0.609267734553776, 0.806]]},
                {'name' : 'fuera_izq',
                'points' : [[0, 0], 
                [0.258009153318078, 0], 
                [0.258009153318078, 1], 
                [0, 1]]},
                {'name' : 'fuera_cen',
                'points' :   [[0.258009153318078, 0], 
                [0.795766590389016, 0], 
                [0.795766590389016, 0.147], 
                [0.258009153318078, 0.147]]},
                {'name' : 'fuera_der',
                'points' :   [[0.795766590389016, 0], 
                [1, 0], 
                [1, 1], 
                [0.795766590389016, 1]]}  ];
  private cachedActualWidth;
  private cachedActualHeight;
  private cachedPolygons;
  @Input() pointerStyle = {'visibility': 'hidden', 
                          'stroke': '#420b0b',
                          'strokeWidth' :5.556,
                          'strokeLinecap' : 'round',
                          'strokeMiterlimit' : 4};
  pointerDots;

  constructor( ) {  }

  ngOnInit() {}

  public getPolygonsConverted(){
    if( this.cachedActualWidth !== this.porteriaImg.nativeElement.width 
     || this.cachedActualHeight !== this.porteriaImg.nativeElement.height )
       this.calculatePolygonsConverted();
    return this.cachedPolygons;
  }

  public calculatePolygonsConverted(){
    this.cachedActualWidth = this.porteriaImg.nativeElement.width;
    this.cachedActualHeight = this.porteriaImg.nativeElement.height; 
    this.cachedPolygons = [];
    for( let polygon of this.polygons ){
      let convertedPoints = "";
      for( let point of polygon.points ){
        convertedPoints += `${point[X] * this.cachedActualWidth}, 
                            ${point[Y] * this.cachedActualHeight} `;
      }
      this.cachedPolygons.push( { 'name' : polygon.name, 
                            'points' : convertedPoints });
    }
    return this.cachedPolygons;
  }

  public onClickPolygon( event ) : void {
    if( event.srcElement.id !== "equis" ){
      console.log( event.srcElement.id );
      let x = event.x;
      let y = event.y;
      let w = 10;
      // event.srcElement.id
      this.pointerStyle.visibility = 'visible';
      this.pointerDots =  `M ${x-w},${y-w} ${x+w},${y+w} 
                            M ${x+w},${y-w} ${x-w},${y+w}`; 
      console.log( x, y );
      console.log( this.pointerDots );
    }
  }

}
