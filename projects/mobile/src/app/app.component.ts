import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'projects/mobile/src/environments/environment';

import { LocalStorage } from './services/local.storage.mock';
import { NavegacionService } from './services/navegacion.service';
import { SecurityService } from './services/security.service';
import { appMenu } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public isProduction: boolean;
  public version: string;
  public appMenu;

  constructor(private security : SecurityService,
              private menu: MenuController,
              private navegacion: NavegacionService,
              private router: Router ) {
    this.isProduction = environment.production;
    this.version = environment.version;
    this.appMenu = appMenu;
  }

  public ngOnInit(): void {
    this.security.reloadUser();
    this.navegacion.init();
  }

  public usuario( property : string ) {
    return this.security.getUsuario( property );
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

  public onClickLogout(){
    this.security.logout();
    this.router.navigate( ['./login'] );
  }

}
