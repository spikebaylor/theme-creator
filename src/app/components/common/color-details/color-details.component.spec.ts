import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDetailsComponent } from './color-details.component';

describe('ColorDetailsComponent', () => {
  let component: ColorDetailsComponent;
  let fixture: ComponentFixture<ColorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
