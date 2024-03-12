import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerPanelComponent } from './color-picker-panel.component';

describe('ColorPickerPanelComponent', () => {
  let component: ColorPickerPanelComponent;
  let fixture: ComponentFixture<ColorPickerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorPickerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
