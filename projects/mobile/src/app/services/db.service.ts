import { Injectable } from '@angular/core';
import { collection, 
        query,
        Firestore, 
        collectionData,
        where,
        doc,
        getDoc} from '@angular/fire/firestore';
import { concat, Observable } from 'rxjs';
import { Club } from '../modelo/club';
import { Equipo } from '../modelo/equipo';



@Injectable({
  providedIn: 'root'
})
export class Db {

  private current : Observable<any>;

  constructor( private firestore : Firestore ) {
    this.current = null;
  }

  public club( clause? : any[] ) : Db {
    if( clause[0] === 'id' ){
      this.current = new Observable( (observer) => {
        getDoc( doc( this.firestore, "clubs", clause[2] ) )
        .then( (docSnapshot) => {
          observer.next( [ docSnapshot.data() ] ); 
          observer.complete();
        });
      });
    }else{
      let clubs = query( collection( this.firestore, "clubs" ), 
                        where( clause[0], clause[1], clause[2] ) );
      this.current = collectionData( clubs ) as Observable<Club[]>;
    }
    return this;
  }

  public equipo( clause? : any[] ){
    if( this.current !== null ){
      this.current = concat( 
              this.current, 
              new Observable( (observer) => {
                let equipos = query( collection( this.firestore, "equipos"))
                            .where( "club.clubId", "==", "9QXtOxWcsAxYfthcykId" );
                this.current = collectionData( equipos ) as Observable<Equipo[]>;
              }));
    }else{
      if( clause[0] === 'id' ){
        this.current = new Observable( (observer) => {
          getDoc( doc( this.firestore, "equipos", clause[2] ) )
          .then( (docSnapshot) => {
            observer.next( [docSnapshot.data() ] );
            observer.complete();
          });
        });
      }else{
        let equipos = query( collection( this.firestore, "equipos" ), 
                              where( clause[0], clause[1], clause[2] ) );
        this.current = collectionData( equipos ) as Observable<Equipo[]>;
      }
    }
    return this;
  }

  public get() : Observable<any> {
    return this.current;
  }

}


