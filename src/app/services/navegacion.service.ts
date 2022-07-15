import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


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
  }

  public init(): void {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        console.log('--------------------------');
        for( let url of this.history ){
          console.log( url ); 
        }
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

