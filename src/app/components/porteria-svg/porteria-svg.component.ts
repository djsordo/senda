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
            top: 0,
            left: 0  };
  @Input() svgStyle = { position : 'absolute', 
            left: '0px', 
            top : '0px' };
  private polygons = [{ 'name' : 'top_left',
                      'points':  [[0.258009153318078, 0.147], 
                                  [0.43421052631579, 0.147], 
                                  [0.43421052631579, 0.362], 
                                  [0.258009153318078, 0.362]] },
                    { 'name' : 'top_center', 
                      'points' : [[0.43421052631579, 0.147], 
                                [0.609267734553776, 0.141], 
                                [0.609267734553776, 0.362], 
                                [0.43421052631579, 0.362]] },
                    {'name' : 'top_right',
                              'points' :[[0.609267734553776, 0.141], 
                              [0.795766590389016, 0.141], 
                              [0.795766590389016, 0.362], 
                              [0.609267734553776, 0.362]] }
                    ];



  constructor() { }

  ngOnInit() {}

  public getPolygonsConverted(){
    let actualWidth = this.porteriaImg.nativeElement.width;
    let actualHeight = this.porteriaImg.nativeElement.height; 
    let result = [];
    for( let polygon of this.polygons ){
      let convertedPoints = [];
      for( let point of polygon.points ){
        convertedPoints.push( [ point[X] * actualWidth, 
                                point[Y] * actualHeight ] );
      }
      result.push( { 'name' : polygon.name, 
                    'points' : convertedPoints });
    }
    return result;
  }

}
