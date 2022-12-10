import { Injectable } from "@angular/core";


import { LocalStorage } from "./local.storage.mock";


@Injectable({
  providedIn : 'root'
})
export class LocalStorageService extends LocalStorage {

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

