import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModoJugadorMicroPage } from './modo-jugador-micro.page';

describe('ModoJugadorMicroPage', () => {
  let component: ModoJugadorMicroPage;
  let fixture: ComponentFixture<ModoJugadorMicroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModoJugadorMicroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModoJugadorMicroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
