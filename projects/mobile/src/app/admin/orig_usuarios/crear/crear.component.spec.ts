import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { initializeApp } from 'firebase/app';

import { environment } from 'projects/mobile/src/environments/environment';
import { CrearComponent } from './crear.component';
import { LocalStorage } from 'projects/mobile/src/app/services/local.storage.mock';
import { FormsModule } from '@angular/forms';


describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;

  beforeAll( ( callMeOnFinish ) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()), 
        RouterTestingModule,
        IonicModule.forRoot(), 
        FormsModule],
        providers: [{ provide : LocalStorage, useFactory: () => {
          let localStorage = new LocalStorage(); 
          localStorage.setValues( [{key : 'emailUsuario', value : 'ajvitores@gmail.com'}]);
          return localStorage;
          } } ]  
    });
    callMeOnFinish();
  } );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearComponent ]    }).compileComponents();

    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create crear usuarios component', () => {
    expect(component).toBeTruthy();
  });
});
