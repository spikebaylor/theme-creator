import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChartComponent } from './color-chart.component';

describe('ColorChartComponent', () => {
  let component: ColorChartComponent;
  let fixture: ComponentFixture<ColorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
