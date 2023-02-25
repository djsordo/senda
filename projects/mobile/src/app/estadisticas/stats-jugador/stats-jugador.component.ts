import { AfterViewInit, Component, 
        OnInit, 
        ViewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-stats-jugador',
  templateUrl: './stats-jugador.component.html',
  styleUrls: ['./stats-jugador.component.scss'],
})
export class StatsJugadorComponent implements OnInit {


  public barCharData : ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barCharData2 : ChartData<'bar'> = {
    labels: [ '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  constructor() { }

  ngOnInit() {
  }


  cositas(){
    console.log("aquí seguimos, investigando cosas");
  }

}
