import { MenuController } from '@ionic/angular';
import { Component, ElementRef, OnInit } from '@angular/core';
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
      url: '/admin', 
      icon: 'cog',
      showDetails: false,
      submenu : [
        { title : 'Clubes', 
          url: '#', 
          icon: 'people'},
          { title : 'Clubes2', 
          url: '#', 
          icon: 'people'},
          { title : 'Clubes3', 
          url: '#', 
          icon: 'people'}
      ]}
  ];

  usuarioActivo = {
    nombre: '',
    email: '',
  };

  constructor(private menu: MenuController, 
              private navegacion : NavegacionService ) {
  }

  public ngOnInit(): void {
    this.navegacion.init();
  }

  public collapseMenu() : void {
    this.menu.toggle();
  }

  public onClickElement( menuEntry : any, ionItem : any ) : void {
    console.log( menuEntry );
    if( menuEntry.submenu ){
      menuEntry.showDetails = !menuEntry.showDetails;
    }
    if( menuEntry.showDetails ) 
      ionItem.detailIcon = 'chevron-down'; 
    else
      ionItem.detailIcon = 'chevron-forward';
    console.log( ionItem );
  }

  public escribeUsuario() {
    console.log('entra');
    this.usuarioActivo = {
      nombre: localStorage.getItem('nombreUsuario'),
      email: localStorage.getItem('emailUsuario'),
    };

  }
}
