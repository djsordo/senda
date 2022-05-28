import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PorteriaComponent } from './porteria.component';

fdescribe('PorteriaComponent', () => {
  let component: PorteriaComponent;
  let fixture: ComponentFixture<PorteriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PorteriaComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PorteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('polygon1', () => {

    let polygon = [[0, 0], [10, 10], [10, 0], [0, 10]];

    expect(component.isPointInsidePolygon([20, 20], polygon)
    ).toBeFalse();
    expect(component.isPointInsidePolygon([5, 5], polygon)
    ).toBeTrue();

  });

  it('polygon2', () => {

    let polygon2 = [[5, 5], [0, 0], [5, 0]];
    expect(component.isPointInsidePolygon([3, 3], polygon2)
    ).toBeTrue();
    expect(component.isPointInsidePolygon([5, 1], polygon2)
    ).toBeTrue();
    expect(component.isPointInsidePolygon([8, 1], polygon2)
    ).toBeFalse();

  });

  it('bizarre polygon', () => {

    let bizarre = [[4, 2], [5, 2], [5, 6], [3, 6], [3, 7],
    [6, 7], [6, 8], [1, 8], [1, 6], [2, 6],
    [2, 5], [1, 5], [1, 4], [2, 4], [2, 3],
    [3, 3], [3, 4], [4, 4]];
    let pointsInside = [[4.5, 2.5],
    [1.5, 4.5],
    [2.5, 5.5],
    [1.5, 6.5],
    [5.5, 7.5]];
    let pointsOutside = [[1.5, 3.5],
    [1.5, 5.5],
    [3.5, 3.5],
    [5.5, 1.5],
    [3.5, 6.5]];

    for (let point of pointsInside) {
      console.log(`test of point: ${point}`);
      console.log(component.isPointInsidePolygon(point, bizarre));
    }

    for (let point of pointsOutside) {
      console.log(`test of point: ${point}`);
      expect(component.isPointInsidePolygon(point, bizarre)).toBeFalse();
    }

  });

});
