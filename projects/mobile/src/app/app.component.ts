import { MenuController } from '@ionic/angular';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { LocalStorage } from './services/local.storage.mock';
import { NavegacionService } from './services/navegacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {


  public appPages = [
    { title: 'Home',
      url: '/home',
      icon: 'home'},
    { title: 'Admin',
      url: '/admin/home',
      icon: 'cog',
      showDetails: false,
      submenu : [
        { title : 'Clubes',
          url: '/admin/clubes',
          icon: 'folder-open'},
        { title : 'Equipos',
          url : '/admin/equipos',
          icon: 'people'},
        { title : 'Usuarios',
          url : '/admin/usuarios',
          icon : 'person' },
        { title : 'Partidos',
          url : '/admin/partidos',
          src : 'assets/handball.svg' }
      ]}
  ];

  usuarioActivo = {
    nombre: '',
    email: '',
  };

  perfil: string;

  public isProduction: boolean;
  public version: string;

  constructor(private menu: MenuController,
              private navegacion: NavegacionService,
              private router: Router,
              private localStorage: LocalStorage ) {
    this.isProduction = environment.production;
    this.version = environment.version;
  }

  public ngOnInit(): void {
    this.perfil = this.localStorage.getItem('perfil');
    this.navegacion.init();
  }

  public ngDoCheck(): void {
    this.perfil = this.localStorage.getItem('perfil');
  }

  public collapseMenu(): void {
    this.menu.toggle();
  }

  public onClickElement( menuEntry: any, ionItem: any ): void {
    if( menuEntry.submenu ){
      menuEntry.showDetails = !menuEntry.showDetails;
    }else{
      this.menu.toggle();
    }
    if( menuEntry.showDetails ){
      ionItem.detailIcon = 'chevron-down';
    }
    else{
      ionItem.detailIcon = 'chevron-forward';
    }
  }

  public onClickShare(){
    this.menu.toggle();
    this.router.navigate( ['./share' ] );
  }

  public escribeUsuario() {
    this.usuarioActivo = {
      nombre: this.localStorage.getItem('nombreUsuario'),
      email: this.localStorage.getItem('emailUsuario'),
    };

  }
}
