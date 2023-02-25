import { AfterViewInit, Component, 
        OnInit, 
        ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats-jugador',
  templateUrl: './stats-jugador.component.html',
  styleUrls: ['./stats-jugador.component.scss'],
})
export class StatsJugadorComponent implements OnInit, AfterViewInit {

  @ViewChild('golesMarcados') golesMarcados;
  chart : Chart;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log( this.golesMarcados );

    console.log( this.golesMarcados );

    this.chart =   new Chart(this.golesMarcados, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }

  cositas(){
    console.log(this.golesMarcados);
  }

}
