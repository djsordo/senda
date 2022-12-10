import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';


export enum ColorScheme {
  dontKnow = 0,
  lightMode = 1,
  darkMode = 2
}

@Injectable({
  providedIn : 'root'
})
export class StylesService {

  private eventoCambioColorScheme = new Subject<ColorScheme>();
  private currentColorScheme : ColorScheme = ColorScheme.dontKnow;

  constructor() {
    window.matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (event : MediaQueryListEvent) =>{
              this.onCambioColorScheme( this, event );
          } );
    if( window.matchMedia('(prefers-color-scheme: dark)').matches )
      this.currentColorScheme = ColorScheme.darkMode;
    else
      this.currentColorScheme = ColorScheme.lightMode;
  }

  suscribirmeACambioColorScheme( callback: (data: any) => void ){
    return this.eventoCambioColorScheme.subscribe( {next: callback } );
  }

  public getCurrentMode(){
    return this.currentColorScheme;
  }

  private onCambioColorScheme( stylesService: StylesService,
                              event: MediaQueryListEvent ){
    if( event.matches ){
      stylesService.currentColorScheme = ColorScheme.darkMode;
    }
    else{
      stylesService.currentColorScheme = ColorScheme.lightMode;
    }
    stylesService.eventoCambioColorScheme.next( stylesService.currentColorScheme );
  }
}


