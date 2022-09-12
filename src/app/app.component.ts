import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavegacionService } from './services/navegacion.service';
import { LocalStorage } from './services/local.storage.mock';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


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

  constructor(private menu: MenuController,
              private navegacion: NavegacionService, 
              private localStorage : LocalStorage ) {
  }

  public ngOnInit(): void {
    this.navegacion.init();
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

  public escribeUsuario() {
    console.log('entra');
    this.usuarioActivo = {
      nombre: this.localStorage.getItem('nombreUsuario'),
      email: this.localStorage.getItem('emailUsuario'),
    };

  }
}
