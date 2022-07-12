import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";


/**
 * Servicio para implementar la funcionalidad "atrás" que 
 * vaya a la página previa. 
 * 
 * Inspired from: https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
 */
 @Injectable({
  providedIn : 'root'
})
export class NavegacionService {

  private history : string[] = [];

  constructor( private router : Router, private location : Location ){
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    })
  }

  public back() : void {
    // remove the current element
    this.history.pop();
    if( this.history.length > 0 ){
      this.router.navigate( [this.history.pop()] );
    }else{
      this.router.navigateByUrl('/');
    }
  }
}

