import { Component, 
        OnDestroy, 
        OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { EstadJugador } from '../../modelo/estadJugador';
import { EstadJugadorService } from '../../services/estad-jugador.service';
import { PartidosService } from '../../services/partidos.service';

@Component({
  selector: 'app-stats-jugador',
  templateUrl: './stats-jugador.component.html',
  styleUrls: ['./stats-jugador.component.scss'],
})
export class StatsJugadorComponent implements OnInit, OnDestroy {

  routeSubscription : Subscription;
  jugadorId : string;

  public barCharData : ChartData<'bar'> = {
    labels: [ '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Goles marcados' }
    ]
  };

  public barCharData2 : ChartData<'bar'> = {
    labels: [ '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  constructor( private route : ActivatedRoute,
               private partidosService : PartidosService,
               private estadJugadorService : EstadJugadorService ) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params : Params) => {
        this.jugadorId = params.jugadorId;
        console.log( params );
        this.estadJugadorService.getEstadJugador( null, this.jugadorId )
          .subscribe( (estadData : EstadJugador[] ) => {
            let statsByDate = new Map<number, object>();
            console.log( estadData );
            for( let estadItem of estadData ){
              this.partidosService.getPartido( estadItem.partidoId )
                .then( partidoSnapshot =>  {
                  const partidoData = partidoSnapshot.data();
                  console.log("partidoData");
                  console.log( partidoData );

                  statsByDate[partidoData.fecha.seconds] = 
                      { label: this.getLabel( partidoData.fecha ), 
                        dataItem: estadItem };
                  console.log( statsByDate );
                });
            }
          });
      }
    );
  }

  private getLabel( timestamp : any ) : string {
    let date = new Date();
    date.setTime( timestamp.seconds * 1000 ); 
    return `${date.getMonth()+1}-${date.getDay()}`
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  cositas(){
    console.log("aquí seguimos, investigando cosas");
  }

}
