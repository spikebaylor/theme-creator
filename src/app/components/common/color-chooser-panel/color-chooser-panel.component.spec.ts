import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChooserPanelComponent } from './color-chooser-panel.component';

describe('ColorChooserPanelComponent', () => {
  let component: ColorChooserPanelComponent;
  let fixture: ComponentFixture<ColorChooserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorChooserPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorChooserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
