import {
  Component,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { StringUtil } from "projects/mobile/src/app/services/string-util";
import { AdminClubesPage } from "../admin-clubes.page";
import { Db } from "../../../services/db.service";
import { Club } from "../../../modelo/club";
import { Partido } from "../../../modelo/partido";
import { Equipo } from "../../../modelo/equipo";

@Component({
  selector: 'clubes-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {


  @ViewChildren('resultCard') resultCards: QueryList<any>;
  @Input() clubes: any = [];
  searchText: string = '';
  currentId: string;

  constructor(private router : Router, 
    private db: Db,
    private renderer: Renderer2,
    private alertController: AlertController,
    private stringUtil: StringUtil) {
  }

  ngOnInit(): void {
    this.currentId = null;
    this.refreshClubList();
  }

  public onClickSearch() {
    this.refreshClubList();
  }

  public onInputChange( event : any ) {
    this.refreshClubList();
  }

  getSelectedId() {
    return this.currentId;
  }

  private refreshClubList() {
    this.clubes = [];
    this.db.getClub()
      .then((clubList) => {
        for (let club of clubList) {
          if (club?.deporte) {
            this.db.getDeporte(club.deporte)
              .then((deporteList) => {
                club['deporte_name'] = deporteList[0].nombre;
              });
          }
          if (this.searchText) {
            if (this.stringUtil.like(club.nombre, this.searchText))
              this.clubes.push(club);
          }
          else
            this.clubes.push(club);
        }
      });
  }

  async onClickBorrar() {
    const alert = await this.alertController.create({
      header: '¿Seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // no hay necesidad de hacer nada
            // en caso de que el usuario cancele
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.db.delClub(this.currentId);
            this.refreshClubList();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public onCardSelected(element: Club) {
    if( element )
      this.currentId = element.id; 
    else
      this.currentId = null;
  }

}
