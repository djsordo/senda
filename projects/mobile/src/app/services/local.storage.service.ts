import { Injectable } from "@angular/core";


export interface LocalStorageProvider {

  setItem(key: string, value: string): void;

  getItem(key: string): string;

  removeItem(key: string): void;

}

@Injectable({
  providedIn : 'root'
})
export class LocalStorageService implements LocalStorageProvider {

  setItem(key: string, value: string): void {
    localStorage.setItem( key, value );
  }
  getItem(key: string): string {
    return localStorage.getItem( key );
  }
  removeItem(key: string): void {
    localStorage.removeItem( key );
  }

}

