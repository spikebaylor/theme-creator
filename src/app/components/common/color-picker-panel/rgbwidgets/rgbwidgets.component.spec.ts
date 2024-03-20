import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RGBWidgetsComponent } from './rgbwidgets.component';

describe('RGBWidgetsComponent', () => {
  let component: RGBWidgetsComponent;
  let fixture: ComponentFixture<RGBWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RGBWidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RGBWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
