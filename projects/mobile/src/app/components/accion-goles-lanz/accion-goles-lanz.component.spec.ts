import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccionGolesLanzComponent } from './accion-goles-lanz.component';

describe('AccionGolesLanzComponent', () => {
  let component: AccionGolesLanzComponent;
  let fixture: ComponentFixture<AccionGolesLanzComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionGolesLanzComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccionGolesLanzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
