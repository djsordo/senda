import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';


import { CrearComponent } from './crear.component';
import { environment } from 'projects/mobile/src/environments/environment';


describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;

  beforeAll( ( callMeOnFinish ) => {
    TestBed.configureTestingModule({
      imports: [ provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()), 
        RouterTestingModule ]
    });

  } );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create crear equipos component', () => {
    expect(component).toBeTruthy();
  });
});
