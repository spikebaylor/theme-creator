import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSLWidgetsComponent } from './hslwidgets.component';

describe('HSLWidgetsComponent', () => {
  let component: HSLWidgetsComponent;
  let fixture: ComponentFixture<HSLWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HSLWidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HSLWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
