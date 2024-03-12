import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorComponentComponent } from './color-component.component';

describe('ColorComponentComponent', () => {
  let component: ColorComponentComponent;
  let fixture: ComponentFixture<ColorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
