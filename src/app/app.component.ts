import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavegacionService } from './services/navegacion.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
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
          icon: 'people'}
      ]}
  ];

  usuarioActivo = {
    nombre: '',
    email: '',
  };

  constructor(private menu: MenuController,
              private navegacion: NavegacionService ) {
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
      nombre: localStorage.getItem('nombreUsuario'),
      email: localStorage.getItem('emailUsuario'),
    };

  }
}
